// Classificadores classicos, implementados aqui e nao importados: o objetivo
// e mostrar o mecanismo, e uma biblioteca esconderia exatamente a parte que
// esta em exibicao. Tudo deterministico: mesma semente, mesma curva.
//
// Cada modelo devolve o mesmo par: uma curva de treino, que diz o que muda a
// cada passo, e uma grade de decisao, que diz o que o modelo responderia em
// cada ponto do plano. O eixo do passo muda de significado por familia, e a
// propria curva declara qual e.

import {data, random, sigmoid, type Point} from './engine.ts';

export type StepAxis = 'epoch' | 'trees' | 'depth' | 'neighbours' | 'samples' | 'iteration';

export type CurvePoint = {step: number; train: number; val: number; loss: number};

export type Fit = {
  algorithm: string;
  axis: StepAxis;
  curve: CurvePoint[];
  grid: number[];
  gridSize: number;
  final: {train: number; val: number; loss: number};
  /** Ate seis instantaneos da fronteira ao longo do treino. Sao eles que
   *  deixam ver o modelo se formando, em vez de so o resultado pronto. */
  frames: {step: number; grid: number[]}[];
  note: string;
  support?: number;
  centres?: number[][];
};

export const GRID = 28;
export const FRAMES = 6;

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1];
const acc = (pts: Point[], f: (x: number[]) => number) =>
  pts.reduce((s, p) => s + (f(p.x) >= 0.5 === (p.y === 1) ? 1 : 0), 0) / pts.length;
const logLoss = (pts: Point[], f: (x: number[]) => number) =>
  pts.reduce((s, p) => {
    const q = Math.min(1 - 1e-9, Math.max(1e-9, f(p.x)));
    return s - (p.y * Math.log(q) + (1 - p.y) * Math.log(1 - q));
  }, 0) / pts.length;

/** A grade e o desenho: uma resposta do modelo por celula, do canto inferior
 *  esquerdo para o superior direito, na mesma ordem em que o SVG a le. */
function gridOf(f: (x: number[]) => number, n = GRID) {
  const out: number[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out.push(f([-1 + (2 * (c + 0.5)) / n, 1 - (2 * (r + 0.5)) / n]));
    }
  }
  return out;
}

/** Decide quais passos viram quadro: os extremos sempre, e o resto espacado
 *  por igual. Guardar todos custaria uma grade por epoca sem dizer mais. */
function recorder(total: number) {
  const marks = new Set<number>();
  for (let i = 0; i < FRAMES; i++) marks.add(Math.round((i * (total - 1)) / (FRAMES - 1)));
  const frames: {step: number; grid: number[]}[] = [];
  return {
    take(index: number, step: number, f: (x: number[]) => number) {
      if (marks.has(index)) frames.push({step, grid: gridOf(f)});
    },
    frames,
  };
}

// ---------- margem maxima linear ----------
/** Hinge com regularizacao L2, descida de gradiente. A perda registrada e a
 *  log-loss para que as curvas de familias diferentes possam ser comparadas
 *  no mesmo eixo. */
function svmLinear(train: Point[], val: Point[], epochs: number, c: number): Fit {
  let w = [0, 0];
  let b = 0;
  const rate = 0.05;
  const curve: CurvePoint[] = [];
  const prob = (x: number[]) => sigmoid(2 * (dot(w, x) + b));
  const rec = recorder(Math.floor(epochs / 5) + 1);
  for (let e = 0; e <= epochs; e++) {
    if (e % 5 === 0 || e === epochs) {
      rec.take(curve.length, e, prob);
      curve.push({step: e, train: acc(train, prob), val: acc(val, prob), loss: logLoss(train, prob)});
    }
    if (e === epochs) break;
    const gw = [w[0] / c, w[1] / c];
    let gb = 0;
    for (const p of train) {
      const y = p.y === 1 ? 1 : -1;
      if (y * (dot(w, p.x) + b) < 1) {
        gw[0] -= (y * p.x[0]) / train.length;
        gw[1] -= (y * p.x[1]) / train.length;
        gb -= y / train.length;
      }
    }
    w = [w[0] - rate * gw[0], w[1] - rate * gw[1]];
    b -= rate * gb;
  }
  const margin = train.filter((p) => (p.y === 1 ? 1 : -1) * (dot(w, p.x) + b) < 1.0001).length;
  return {
    algorithm: 'svm-linear',
    axis: 'epoch',
    curve,
    grid: gridOf(prob),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    support: margin,
    note: 'Only the points inside the margin push the boundary. The rest could be deleted without changing it.',
  };
}

// ---------- margem maxima com kernel ----------
/** Representer theorem: a fronteira e uma soma de gaussianas centradas nos
 *  proprios pontos de treino, e o que se aprende sao os pesos dessa soma. */
function svmRbf(train: Point[], val: Point[], epochs: number, gamma: number): Fit {
  const n = train.length;
  const alpha = new Array(n).fill(0);
  let b = 0;
  const rate = 0.5;
  const lambda = 0.01;
  const k = (a: number[], c: number[]) => Math.exp(-gamma * ((a[0] - c[0]) ** 2 + (a[1] - c[1]) ** 2));
  const K: number[][] = train.map((p) => train.map((q) => k(p.x, q.x)));
  const raw = (x: number[]) => train.reduce((s, p, i) => s + alpha[i] * k(p.x, x), 0) + b;
  const prob = (x: number[]) => sigmoid(2 * raw(x));
  const curve: CurvePoint[] = [];
  const rec = recorder(Math.floor(epochs / 5) + 1);
  for (let e = 0; e <= epochs; e++) {
    if (e % 5 === 0 || e === epochs) {
      rec.take(curve.length, e, prob);
      curve.push({step: e, train: acc(train, prob), val: acc(val, prob), loss: logLoss(train, prob)});
    }
    if (e === epochs) break;
    const g = new Array(n).fill(0);
    let gb = 0;
    for (let i = 0; i < n; i++) {
      const y = train[i].y === 1 ? 1 : -1;
      const f = K[i].reduce((s, kv, j) => s + alpha[j] * kv, 0) + b;
      if (y * f < 1) {
        for (let j = 0; j < n; j++) g[j] -= (y * K[i][j]) / n;
        gb -= y / n;
      }
    }
    for (let j = 0; j < n; j++) alpha[j] -= rate * (g[j] + lambda * alpha[j]);
    b -= rate * gb;
  }
  return {
    algorithm: 'svm-rbf',
    axis: 'epoch',
    curve,
    grid: gridOf(prob),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    support: alpha.filter((a) => Math.abs(a) > 1e-3).length,
    note: 'A curved boundary without curved features: the kernel measures distance, and distance is not linear.',
  };
}

// ---------- vizinhos ----------
/** Sem treino. A curva varre k, que e o unico botao, e mostra o custo de
 *  escolher errado nas duas pontas. */
function knn(train: Point[], val: Point[], maxK: number): Fit {
  const predict = (x: number[], k: number) => {
    const near = train
      .map((p) => ({d: (p.x[0] - x[0]) ** 2 + (p.x[1] - x[1]) ** 2, y: p.y}))
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    return near.reduce((s, p) => s + p.y, 0) / k;
  };
  const curve: CurvePoint[] = [];
  const rec = recorder(Math.ceil(maxK / 2));
  for (let k = 1; k <= maxK; k += 2) {
    const f = (x: number[]) => predict(x, k);
    rec.take(curve.length, k, f);
    curve.push({step: k, train: acc(train, f), val: acc(val, f), loss: logLoss(val, f)});
  }
  const best = curve.reduce((a, b) => (b.val > a.val ? b : a));
  return {
    algorithm: 'knn',
    axis: 'neighbours',
    curve,
    grid: gridOf((x) => predict(x, best.step)),
    gridSize: GRID,
    final: best,
    frames: rec.frames,
    note: `Nothing is learned and nothing is stored beyond the data itself. k = ${best.step} scored best on validation.`,
  };
}

// ---------- arvore e floresta ----------
type Node = {leaf: true; p: number} | {leaf: false; feat: number; thr: number; left: Node; right: Node};

function grow(pts: Point[], depth: number, rng: () => number, subsample: boolean): Node {
  const mean = pts.length ? pts.reduce((s, p) => s + p.y, 0) / pts.length : 0.5;
  if (depth === 0 || pts.length < 5 || mean === 0 || mean === 1) return {leaf: true, p: mean};
  const gini = (a: Point[]) => {
    if (!a.length) return 0;
    const m = a.reduce((s, p) => s + p.y, 0) / a.length;
    return 2 * m * (1 - m) * a.length;
  };
  let best: {feat: number; thr: number; score: number} | null = null;
  const feats = subsample ? [rng() < 0.5 ? 0 : 1] : [0, 1];
  for (const feat of feats) {
    for (let t = -0.9; t <= 0.9; t += 0.1) {
      const l = pts.filter((p) => p.x[feat] <= t);
      const r = pts.filter((p) => p.x[feat] > t);
      if (l.length < 3 || r.length < 3) continue;
      const score = gini(l) + gini(r);
      if (!best || score < best.score) best = {feat, thr: t, score};
    }
  }
  if (!best) return {leaf: true, p: mean};
  return {
    leaf: false,
    feat: best.feat,
    thr: best.thr,
    left: grow(pts.filter((p) => p.x[best!.feat] <= best!.thr), depth - 1, rng, subsample),
    right: grow(pts.filter((p) => p.x[best!.feat] > best!.thr), depth - 1, rng, subsample),
  };
}

const ask = (n: Node, x: number[]): number => (n.leaf ? n.p : ask(x[n.feat] <= n.thr ? n.left : n.right, x));

/** A curva varre a profundidade, que e onde a arvore passa de rasa demais a
 *  decorada: treino sobe sempre, validacao para de subir e desce. */
function tree(train: Point[], val: Point[], maxDepth: number): Fit {
  const curve: CurvePoint[] = [];
  const rec = recorder(maxDepth);
  let last: Node = {leaf: true, p: 0.5};
  for (let d = 1; d <= maxDepth; d++) {
    last = grow(train, d, random(7), false);
    const node = last;
    const f = (x: number[]) => ask(node, x);
    rec.take(curve.length, d, f);
    curve.push({step: d, train: acc(train, f), val: acc(val, f), loss: logLoss(val, f)});
  }
  return {
    algorithm: 'tree',
    axis: 'depth',
    curve,
    grid: gridOf((x) => ask(last, x)),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    note: 'Every boundary is an axis-aligned cut, which is why the regions come out as rectangles.',
  };
}

/** Cada arvore ve uma reamostragem com reposicao e uma feature sorteada; a
 *  curva mostra a media estabilizando conforme as arvores entram. */
function forest(train: Point[], val: Point[], trees: number, depth: number): Fit {
  const rng = random(11);
  const built: Node[] = [];
  const curve: CurvePoint[] = [];
  const rec = recorder(trees);
  for (let t = 1; t <= trees; t++) {
    const bag = Array.from({length: train.length}, () => train[Math.floor(rng() * train.length)]);
    built.push(grow(bag, depth, rng, true));
    const f = (x: number[]) => built.reduce((s, n) => s + ask(n, x), 0) / built.length;
    rec.take(curve.length, t, f);
    curve.push({step: t, train: acc(train, f), val: acc(val, f), loss: logLoss(val, f)});
  }
  const f = (x: number[]) => built.reduce((s, n) => s + ask(n, x), 0) / built.length;
  return {
    algorithm: 'forest',
    axis: 'trees',
    curve,
    grid: gridOf(f),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    note: 'Averaging many overfitted trees is not the same as one shallow tree. The variance cancels; the signal does not.',
  };
}

// ---------- boosting ----------
type RegNode = {leaf: true; v: number} | {leaf: false; feat: number; thr: number; left: RegNode; right: RegNode};

/** Arvore de regressao sobre o residuo, minimizando soma dos quadrados.
 *  A profundidade importa e nao e detalhe: com profundidade 1, um toco so,
 *  o modelo vira f(x1) + f(x2) e nao representa interacao nenhuma, entao o
 *  XOR fica fora do alcance por construcao. Duas ja bastam. */
function growReg(rows: {x: number[]; r: number}[], depth: number): RegNode {
  const mean = rows.length ? rows.reduce((s, e) => s + e.r, 0) / rows.length : 0;
  if (depth === 0 || rows.length < 6) return {leaf: true, v: mean};
  const sse = (a: {r: number}[]) => {
    if (!a.length) return 0;
    const m = a.reduce((s, e) => s + e.r, 0) / a.length;
    return a.reduce((s, e) => s + (e.r - m) ** 2, 0);
  };
  let best: {feat: number; thr: number; score: number} | null = null;
  for (const feat of [0, 1]) {
    for (let thr = -0.9; thr <= 0.9; thr += 0.1) {
      const l = rows.filter((e) => e.x[feat] <= thr);
      const r = rows.filter((e) => e.x[feat] > thr);
      if (l.length < 3 || r.length < 3) continue;
      const score = sse(l) + sse(r);
      if (!best || score < best.score) best = {feat, thr, score};
    }
  }
  if (!best) return {leaf: true, v: mean};
  return {
    leaf: false,
    feat: best.feat,
    thr: best.thr,
    left: growReg(rows.filter((e) => e.x[best!.feat] <= best!.thr), depth - 1),
    right: growReg(rows.filter((e) => e.x[best!.feat] > best!.thr), depth - 1),
  };
}

const askReg = (n: RegNode, x: number[]): number => (n.leaf ? n.v : askReg(x[n.feat] <= n.thr ? n.left : n.right, x));

/** Cada arvore e ajustada ao residuo do que veio antes, entao a sequencia
 *  importa: retirar a decima muda todas as seguintes. */
function boosting(train: Point[], val: Point[], rounds: number, rate: number, depth = 2): Fit {
  const built: RegNode[] = [];
  const score = (x: number[]) => built.reduce((s, t) => s + rate * askReg(t, x), 0);
  const prob = (x: number[]) => sigmoid(score(x));
  const curve: CurvePoint[] = [];
  const rec = recorder(rounds);
  for (let t = 1; t <= rounds; t++) {
    const rows = train.map((p) => ({x: p.x, r: p.y - sigmoid(score(p.x))}));
    built.push(growReg(rows, depth));
    rec.take(curve.length, t, prob);
    curve.push({step: t, train: acc(train, prob), val: acc(val, prob), loss: logLoss(val, prob)});
  }
  return {
    algorithm: 'boosting',
    axis: 'trees',
    curve,
    grid: gridOf(prob),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    note: 'Depth two, not one: a single stump adds one feature to another and can never represent XOR. Watch the validation curve after it peaks, too.',
  };
}

// ---------- naive bayes ----------
/** A curva aqui e de aprendizado: mesma receita, mais dados. E o unico modelo
 *  da lista cujo ajuste e uma conta fechada, sem iteracao nenhuma. */
function naiveBayes(train: Point[], val: Point[]): Fit {
  const fitOn = (pts: Point[]) => {
    const cls = [0, 1].map((c) => {
      const sub = pts.filter((p) => p.y === c);
      const mean = [0, 1].map((d) => sub.reduce((s, p) => s + p.x[d], 0) / Math.max(1, sub.length));
      const varr = [0, 1].map(
        (d) => sub.reduce((s, p) => s + (p.x[d] - mean[d]) ** 2, 0) / Math.max(1, sub.length) + 1e-3,
      );
      return {prior: sub.length / Math.max(1, pts.length), mean, varr};
    });
    return (x: number[]) => {
      const lp = cls.map((c) =>
        Math.log(Math.max(1e-9, c.prior)) +
        [0, 1].reduce((s, d) => s - 0.5 * Math.log(2 * Math.PI * c.varr[d]) - (x[d] - c.mean[d]) ** 2 / (2 * c.varr[d]), 0),
      );
      const m = Math.max(...lp);
      const e = lp.map((v) => Math.exp(v - m));
      return e[1] / (e[0] + e[1]);
    };
  };
  const curve: CurvePoint[] = [];
  const rec = recorder(Math.floor(train.length / 10));
  let f = fitOn(train);
  for (let n = 10; n <= train.length; n += 10) {
    f = fitOn(train.slice(0, n));
    rec.take(curve.length, n, f);
    curve.push({step: n, train: acc(train.slice(0, n), f), val: acc(val, f), loss: logLoss(val, f)});
  }
  return {
    algorithm: 'bayes',
    axis: 'samples',
    curve,
    grid: gridOf(f),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    note: 'It assumes the two features are independent given the class. They are not, and it often works anyway.',
  };
}

// ---------- k-means ----------
/** O unico nao supervisionado da lista. Ele agrupa sem ver rotulo nenhum; o
 *  rotulo entra depois, so para medir o que os grupos acertaram. */
function kmeans(train: Point[], val: Point[], k: number, iterations: number): Fit {
  const rng = random(23);
  /* k-means++: o primeiro centro e um ponto sorteado, e cada centro seguinte
     sai de um sorteio ponderado pela distancia ao centro mais proximo ja
     escolhido. Semear ao acaso no quadrado deixa grupos vazios e faz o
     resultado depender da sorte, que e o defeito que esta inicializacao
     existe para fechar. */
  const centres: number[][] = [train[Math.floor(rng() * train.length)].x.slice()];
  while (centres.length < k) {
    const d2 = train.map((p) =>
      Math.min(...centres.map((c) => (c[0] - p.x[0]) ** 2 + (c[1] - p.x[1]) ** 2)),
    );
    const total = d2.reduce((a, b) => a + b, 0);
    let cut = rng() * total;
    let pick = train.length - 1;
    for (let i = 0; i < train.length; i++) {
      cut -= d2[i];
      if (cut <= 0) {
        pick = i;
        break;
      }
    }
    centres.push(train[pick].x.slice());
  }
  const curve: CurvePoint[] = [];
  let labels = new Array(k).fill(0.5);
  const nearest = (x: number[]) => {
    let bi = 0;
    let bd = Infinity;
    centres.forEach((c, i) => {
      const d = (c[0] - x[0]) ** 2 + (c[1] - x[1]) ** 2;
      if (d < bd) {
        bd = d;
        bi = i;
      }
    });
    return bi;
  };
  const rec = recorder(iterations);
  for (let it = 1; it <= iterations; it++) {
    const groups: Point[][] = Array.from({length: k}, () => []);
    for (const p of train) groups[nearest(p.x)].push(p);
    groups.forEach((g, i) => {
      if (g.length) centres[i] = [0, 1].map((d) => g.reduce((s, p) => s + p.x[d], 0) / g.length);
    });
    labels = groups.map((g) => (g.length ? g.reduce((s, p) => s + p.y, 0) / g.length : 0.5));
    const f = (x: number[]) => labels[nearest(x)];
    const inertia =
      train.reduce((s, p) => {
        const c = centres[nearest(p.x)];
        return s + (c[0] - p.x[0]) ** 2 + (c[1] - p.x[1]) ** 2;
      }, 0) / train.length;
    rec.take(curve.length, it, f);
    curve.push({step: it, train: acc(train, f), val: acc(val, f), loss: inertia});
  }
  const f = (x: number[]) => labels[nearest(x)];
  return {
    algorithm: 'kmeans',
    axis: 'iteration',
    curve,
    grid: gridOf(f),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    centres,
    note: 'The loss here is inertia, not error: it never saw a label. Accuracy is measured afterwards, by asking what each group turned out to be.',
  };
}

// ---------- regressao logistica ----------
function logistic(train: Point[], val: Point[], epochs: number, rate: number): Fit {
  let w = [0, 0];
  let b = 0;
  const prob = (x: number[]) => sigmoid(dot(w, x) + b);
  const curve: CurvePoint[] = [];
  const rec = recorder(Math.floor(epochs / 5) + 1);
  for (let e = 0; e <= epochs; e++) {
    if (e % 5 === 0 || e === epochs) {
      rec.take(curve.length, e, prob);
      curve.push({step: e, train: acc(train, prob), val: acc(val, prob), loss: logLoss(train, prob)});
    }
    if (e === epochs) break;
    const g = [0, 0];
    let gb = 0;
    for (const p of train) {
      const d = prob(p.x) - p.y;
      g[0] += (d * p.x[0]) / train.length;
      g[1] += (d * p.x[1]) / train.length;
      gb += d / train.length;
    }
    w = [w[0] - rate * g[0], w[1] - rate * g[1]];
    b -= rate * gb;
  }
  return {
    algorithm: 'logistic',
    axis: 'epoch',
    curve,
    grid: gridOf(prob),
    gridSize: GRID,
    final: curve[curve.length - 1],
    frames: rec.frames,
    note: 'Three numbers decide everything: two weights and a bias. The boundary can only ever be a straight line.',
  };
}

export type ClassicOptions = {
  algorithm: string;
  dataset: string;
  strength: number;
};

export const algorithms = [
  'logistic',
  'svm-linear',
  'svm-rbf',
  'knn',
  'tree',
  'forest',
  'boosting',
  'bayes',
  'kmeans',
] as const;

/** Um ponto de entrada so, para que a interface nao precise saber qual
 *  familia recebe qual botao. `strength` e o hiperparametro principal de
 *  cada uma, normalizado de 0 a 1. */
export function fitClassic(o: ClassicOptions): Fit {
  const train = data(o.dataset, 120, 42);
  const val = data(o.dataset, 80, 314);
  const s = Math.min(1, Math.max(0, o.strength));
  switch (o.algorithm) {
    case 'svm-linear':
      return svmLinear(train, val, 120, 0.05 + s * 2);
    case 'svm-rbf':
      return svmRbf(train, val, 90, 0.5 + s * 12);
    case 'knn':
      return knn(train, val, 3 + Math.round(s * 24));
    case 'tree':
      return tree(train, val, 1 + Math.round(s * 7));
    case 'forest':
      return forest(train, val, 4 + Math.round(s * 36), 4);
    case 'boosting':
      return boosting(train, val, 6 + Math.round(s * 54), 0.25 + s * 0.35);
    case 'bayes':
      return naiveBayes(train, val);
    case 'kmeans':
      return kmeans(train, val, 2 + Math.round(s * 6), 12);
    default:
      return logistic(train, val, 150, 0.2 + s * 1.2);
  }
}

export const points = (dataset: string) => data(dataset, 120, 42);
