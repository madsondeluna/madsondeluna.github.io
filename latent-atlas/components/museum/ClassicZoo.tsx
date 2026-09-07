'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Play, Pause, RotateCcw} from 'lucide-react';
import {Control, Choice, Panel, Stats} from './common';
import {fitClassic, points, type Fit} from '@/lib/museum/classic';
import {t as tr} from '@/lib/museum/i18n';
import {type Lang} from '@/lib/atlas/pt';

const ALGORITHMS: [string, string][] = [
  ['logistic', 'Logistic'],
  ['svm-linear', 'SVM, linear'],
  ['svm-rbf', 'SVM, RBF'],
  ['knn', 'k-NN'],
  ['tree', 'Decision tree'],
  ['forest', 'Random forest'],
  ['boosting', 'Gradient boosting'],
  ['bayes', 'Naive Bayes'],
  ['kmeans', 'k-means'],
];

const KNOB: Record<string, string> = {
  logistic: 'Learning rate',
  'svm-linear': 'Margin softness C',
  'svm-rbf': 'Kernel width γ',
  knn: 'Largest k swept',
  tree: 'Maximum depth',
  forest: 'Number of trees',
  boosting: 'Boosting rounds',
  bayes: 'Fixed: it has no knob',
  kmeans: 'Number of clusters k',
};

const AXIS: Record<string, string> = {
  epoch: 'Epoch',
  trees: 'Trees',
  depth: 'Depth',
  neighbours: 'k',
  samples: 'Training points',
  iteration: 'Iteration',
};

const FAMILY: Record<string, string> = {
  logistic: 'One straight line, three parameters. The baseline every other model has to beat.',
  'svm-linear': 'Also a straight line, placed to leave the widest possible gap between the classes.',
  'svm-rbf': 'The same margin idea, measured through a kernel, so the boundary can bend.',
  knn: 'No training at all. The answer is a vote among the nearest stored points.',
  tree: 'A sequence of yes-or-no cuts, each one on a single feature.',
  forest: 'Many overfitted trees, each on a different resample, averaged.',
  boosting: 'Small trees added in sequence, each fixing what the previous ones got wrong.',
  bayes: 'A closed-form fit: mean and variance per class per feature, then Bayes rule.',
  kmeans: 'Unsupervised. It groups the plane without ever seeing a label.',
};

/** Superficie de decisao e nuvem de pontos no mesmo SVG. A grade vem pronta
 *  do ajuste, entao aqui nao ha calculo: so desenho. */
function Surface({fit, frame, dataset}: {fit: Fit; frame: number; dataset: string}) {
  const pts = useMemo(() => points(dataset), [dataset]);
  const grid = fit.frames[Math.min(frame, fit.frames.length - 1)]?.grid ?? fit.grid;
  const n = fit.gridSize;
  const cell = 260 / n;
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label={`Decision surface for ${fit.algorithm} on the ${dataset} data`}>
      <g transform="translate(24 16)">
        {grid.map((v, i) => (
          <rect
            key={i}
            x={(i % n) * cell}
            y={Math.floor(i / n) * cell}
            width={cell + 0.5}
            height={cell + 0.5}
            fill={
              v >= 0.5
                ? `color-mix(in oklab, var(--chart-1) ${Math.round((v - 0.5) * 150)}%, transparent)`
                : `color-mix(in oklab, var(--chart-2) ${Math.round((0.5 - v) * 150)}%, transparent)`
            }
          />
        ))}
        {pts.map((p, i) =>
          p.y === 1 ? (
            <path
              key={i}
              d={`M${(p.x[0] + 1) * 130} ${(1 - p.x[1]) * 130}l3 3 -3 3 -3 -3Z`}
              fill="var(--chart-1)"
              stroke="var(--bg)"
              strokeWidth="0.6"
            />
          ) : (
            <circle
              key={i}
              cx={(p.x[0] + 1) * 130}
              cy={(1 - p.x[1]) * 130}
              r="2.6"
              fill="var(--chart-2)"
              stroke="var(--bg)"
              strokeWidth="0.6"
            />
          ),
        )}
        {fit.centres?.map((c, i) => (
          <g key={i}>
            <circle cx={(c[0] + 1) * 130} cy={(1 - c[1]) * 130} r="6" fill="none" stroke="var(--text)" strokeWidth="1.4" />
            <circle cx={(c[0] + 1) * 130} cy={(1 - c[1]) * 130} r="1.6" fill="var(--text)" />
          </g>
        ))}
        <rect x="0" y="0" width="260" height="260" fill="none" stroke="var(--border)" />
        <text x="0" y="276" fill="var(--muted)" fontSize="9">Feature x₁ −1</text>
        <text x="260" y="276" textAnchor="end" fill="var(--muted)" fontSize="9">+1</text>
      </g>
    </svg>
  );
}

/** Curva de treino: acerto no treino e na validacao no mesmo eixo, com a
 *  posicao atual marcada. O eixo horizontal muda de nome por familia. */
function Curve({fit, frame, lang = 'en'}: {fit: Fit; frame: number; lang?: Lang}) {
  const t = (k: string) => tr(lang, k);
  const c = fit.curve;
  const last = c[c.length - 1].step;
  const first = c[0].step;
  const span = Math.max(1, last - first);
  const x = (s: number) => 34 + ((s - first) / span) * 250;
  const y = (v: number) => 140 - v * 118;
  const line = (key: 'train' | 'val') => c.map((p) => `${x(p.step)},${y(p[key])}`).join(' ');
  const at = fit.frames[Math.min(frame, fit.frames.length - 1)]?.step ?? last;
  return (
    <svg viewBox="0 0 300 190" role="img" aria-label={t('Training and validation accuracy across the training axis')}>
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1="34" y1={y(v)} x2="284" y2={y(v)} stroke="var(--chart-grid)" />
          <text x="28" y={y(v) + 3} textAnchor="end" fill="var(--muted)" fontSize="8">
            {v === 0 ? '0' : v === 1 ? '1' : '.5'}
          </text>
        </g>
      ))}
      <line x1={x(at)} y1="18" x2={x(at)} y2="140" stroke="var(--text)" strokeDasharray="2 2" />
      <polyline points={line('train')} fill="none" stroke="var(--chart-1)" strokeWidth="1.6" />
      <polyline points={line('val')} fill="none" stroke="var(--chart-3)" strokeWidth="1.6" strokeDasharray="3 2" />
      <text x="34" y="158" fill="var(--muted)" fontSize="8">{t(AXIS[fit.axis])} {first}</text>
      <text x="284" y="158" textAnchor="end" fill="var(--muted)" fontSize="8">{last}</text>
      <text x="34" y="176" fill="var(--chart-1)" fontSize="9">{t('Training')}</text>
      <text x="86" y="176" fill="var(--chart-3)" fontSize="9">{t('Validation')}</text>
    </svg>
  );
}

export function ClassicZoo({lang = 'en'}: {lang?: Lang}) {
  const t = (k: string) => tr(lang, k);
  const [algorithm, setAlgorithm] = useState('logistic');
  const [dataset, setDataset] = useState('linear');
  const [strength, setStrength] = useState(0.5);
  const fit = useMemo(() => fitClassic({algorithm, dataset, strength}), [algorithm, dataset, strength]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* O quadro visivel pertence a um ajuste. Guardar os dois juntos e ler o
     quadro so quando a chave bate dispensa o efeito que sincronizava um com
     o outro, e com ele some o render em cascata que o lint apontava. */
  const key = `${algorithm}|${dataset}|${strength}`;
  const [view, setView] = useState(() => ({key, frame: fit.frames.length - 1, playing: false}));
  const current = view.key === key ? view : {key, frame: fit.frames.length - 1, playing: false};
  const frame = current.frame;
  const playing = current.playing;
  const setFrame = (f: number | ((p: number) => number)) =>
    setView((v) => {
      const base = v.key === key ? v : {key, frame: fit.frames.length - 1, playing: false};
      return {...base, key, frame: typeof f === 'function' ? f(base.frame) : f};
    });
  const setPlaying = (p: boolean) =>
    setView((v) => {
      const base = v.key === key ? v : {key, frame: fit.frames.length - 1, playing: false};
      return {...base, key, playing: p};
    });

  /* O relogio escreve direto no estado unico, entao o efeito nao depende de
     nenhuma funcao recriada a cada render. Ele para sozinho no ultimo quadro
     e ao trocar de ajuste, porque a chave deixa de bater. */
  const total = fit.frames.length;
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setView((v) => {
        if (v.key !== key || v.frame >= total - 1) return {...v, playing: false};
        return {...v, frame: v.frame + 1};
      });
    }, 420);
    const clock = timer.current;
    return () => clearInterval(clock);
  }, [playing, total, key]);

  const step = fit.frames[Math.min(frame, fit.frames.length - 1)]?.step ?? 0;
  const shown = fit.curve.find((p) => p.step === step) ?? fit.final;

  return (
    <>
      <div className="section-head">
        <h2>{t('The nine, side by side')}</h2>
        <span>{t('Pick one, then watch it train below')}</span>
      </div>
      <div className="zoo-grid">
        {ALGORITHMS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`zoo-card${algorithm === key ? ' is-picked' : ''}`}
            aria-pressed={algorithm === key}
            onClick={() => setAlgorithm(key)}
          >
            <span className="zoo-name">{t(label)}</span>
            <span className="zoo-note">{t(FAMILY[key]).split('.')[0]}.</span>
          </button>
        ))}
      </div>
      <Panel
        title={t('Nine classifiers, one plane')}
        hint={t('Pick a family, then watch it train')}
        inspector={
          <>
            <span className="tag">{t(ALGORITHMS.find(([k]) => k === algorithm)?.[1] ?? '')}</span>
            <h3>{t(FAMILY[algorithm])}</h3>
            <Choice label={t('Synthetic dataset')} value={dataset} onChange={setDataset} items={[['linear', t('Linear')], ['xor', 'XOR'], ['circle', t('Circle')]]} />
            <Control
              label={t(KNOB[algorithm])}
              value={strength}
              onChange={setStrength}
              min={0}
              max={1}
              step={0.1}
              disabled={algorithm === 'bayes'}
              format={(v) => `${Math.round(v * 100)}%`}
            />
            <div className="experiment-actions">
              <button className="btn lit lit-swell" data-lit type="button" onClick={() => (playing ? setPlaying(false) : (setFrame(0), setPlaying(true)))}>
                {playing ? <Pause size={14} /> : <Play size={14} />}
                {playing ? t('Pause') : t('Replay the training')}
              </button>
              <button className="btn secondary small glass lit lit-swell" data-lit type="button" onClick={() => setFrame(fit.frames.length - 1)}>
                <RotateCcw size={14} /> {t('Trained')}
              </button>
            </div>
            <div className="formula">{t(fit.note)}</div>
            {fit.support !== undefined && (
              <p className="small-note">
                {algorithm === 'svm-rbf'
                  ? `${fit.support} of 120 points carry a non-zero coefficient. A real solver returns a sparse answer, where most of them would be zero; gradient descent does not.`
                  : `${fit.support} of 120 training points sit on or inside the margin. Deleting any of the others would not move the boundary.`}
              </p>
            )}
          </>
        }
        footer={
          <>
            <div className="legend">
              <span><i style={{background: 'var(--chart-1)'}} />{t('Class 1')}</span>
              <span><i style={{background: 'var(--chart-2)'}} />{t('Class 0')}</span>
              <span><i style={{background: 'var(--chart-3)'}} />{t('Validation')}</span>
            </div>
            <span>{t(AXIS[fit.axis])} {step} / {fit.curve[fit.curve.length - 1].step}</span>
          </>
        }
      >
        <div className="zoo-plots">
          <Surface fit={fit} frame={frame} dataset={dataset} />
          <Curve fit={fit} frame={frame} lang={lang} />
        </div>
        <Stats
          items={[
            [`${(shown.train * 100).toFixed(0)}%`, t('training accuracy')],
            [`${(shown.val * 100).toFixed(0)}%`, t('validation accuracy')],
            [fit.axis === 'iteration' ? shown.loss.toFixed(3) : shown.loss.toFixed(3), fit.axis === 'iteration' ? t('inertia') : t('log loss')],
          ]}
        />
        <Control
          label={t('Step through the training')}
          value={frame}
          onChange={(v) => {
            setPlaying(false);
            setFrame(v);
          }}
          min={0}
          max={fit.frames.length - 1}
          step={1}
          format={(v) => `${t(AXIS[fit.axis])} ${fit.frames[v]?.step ?? 0}`}
        />
      </Panel>
    </>
  );
}
