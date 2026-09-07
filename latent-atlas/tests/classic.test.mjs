import test from 'node:test';
import assert from 'node:assert/strict';
import {fitClassic, algorithms, GRID} from '../lib/museum/classic.ts';

const shapes = ['linear', 'xor', 'circle'];

test('every algorithm returns a curve, a grid and a final score on every dataset', () => {
  for (const algorithm of algorithms) {
    for (const dataset of shapes) {
      const f = fitClassic({algorithm, dataset, strength: 0.5});
      assert.equal(f.grid.length, GRID * GRID, `${algorithm}/${dataset} grid size`);
      assert.ok(f.curve.length >= 3, `${algorithm}/${dataset} curve length`);
      for (const v of f.grid) assert.ok(v >= 0 && v <= 1 && Number.isFinite(v), `${algorithm} grid value ${v}`);
      for (const p of f.curve) {
        assert.ok(p.train >= 0 && p.train <= 1, `${algorithm} train ${p.train}`);
        assert.ok(p.val >= 0 && p.val <= 1, `${algorithm} val ${p.val}`);
        assert.ok(Number.isFinite(p.loss), `${algorithm} loss`);
      }
    }
  }
});

test('the same settings produce the same fit twice', () => {
  for (const algorithm of algorithms) {
    const a = fitClassic({algorithm, dataset: 'xor', strength: 0.6});
    const b = fitClassic({algorithm, dataset: 'xor', strength: 0.6});
    assert.deepEqual(a.curve, b.curve, `${algorithm} curve`);
    assert.deepEqual(a.grid, b.grid, `${algorithm} grid`);
  }
});

test('linear models separate the linear rule and fail the XOR one', () => {
  for (const algorithm of ['logistic', 'svm-linear']) {
    const easy = fitClassic({algorithm, dataset: 'linear', strength: 0.5});
    const hard = fitClassic({algorithm, dataset: 'xor', strength: 0.5});
    assert.ok(easy.final.val > 0.85, `${algorithm} linear ${easy.final.val}`);
    assert.ok(hard.final.val < 0.75, `${algorithm} xor ${hard.final.val}`);
  }
});

test('nonlinear models handle XOR, which the straight line cannot', () => {
  for (const algorithm of ['svm-rbf', 'knn', 'tree', 'forest', 'boosting']) {
    const f = fitClassic({algorithm, dataset: 'xor', strength: 0.6});
    assert.ok(f.final.val > 0.8, `${algorithm} xor ${f.final.val}`);
  }
});

test('nonlinear models draw a real boundary on every shape', () => {
  for (const algorithm of ['svm-rbf', 'knn', 'tree', 'forest', 'boosting', 'bayes']) {
    for (const dataset of shapes) {
      const f = fitClassic({algorithm, dataset, strength: 0.5});
      assert.ok(f.grid.some((v) => v > 0.5) && f.grid.some((v) => v < 0.5), `${algorithm}/${dataset} is constant`);
    }
  }
});

test('a straight line has nothing to say about the circle, and the grid shows it', () => {
  const linear = fitClassic({algorithm: 'logistic', dataset: 'linear', strength: 0.5});
  assert.ok(linear.grid.some((v) => v > 0.5) && linear.grid.some((v) => v < 0.5));
  const circle = fitClassic({algorithm: 'logistic', dataset: 'circle', strength: 0.5});
  const spread = Math.max(...circle.grid) - Math.min(...circle.grid);
  assert.ok(spread < 0.35, `expected a nearly flat surface, got a spread of ${spread}`);
});

test('k-means groups the plane even when the groups do not match the labels', () => {
  for (const dataset of shapes) {
    const f = fitClassic({algorithm: 'kmeans', dataset, strength: 0.5});
    const spread = Math.max(...f.grid) - Math.min(...f.grid);
    assert.ok(spread > 0.2, `${dataset} produced a flat surface, spread ${spread}`);
    assert.ok((f.centres ?? []).length >= 2);
  }
});

test('k-means reports inertia that falls, and never rises, across iterations', () => {
  const f = fitClassic({algorithm: 'kmeans', dataset: 'circle', strength: 0.4});
  assert.equal(f.axis, 'iteration');
  for (let i = 1; i < f.curve.length; i++) {
    assert.ok(f.curve[i].loss <= f.curve[i - 1].loss + 1e-9, `inertia rose at step ${i}`);
  }
});

test('the max-margin models report how many points hold the boundary', () => {
  const lin = fitClassic({algorithm: 'svm-linear', dataset: 'linear', strength: 0.5});
  assert.ok(lin.support > 0 && lin.support <= 120);
});

test('every fit records boundary frames, ordered, ending at the trained model', () => {
  for (const algorithm of algorithms) {
    const f = fitClassic({algorithm, dataset: 'circle', strength: 0.5});
    assert.ok(f.frames.length >= 2 && f.frames.length <= 6, `${algorithm} kept ${f.frames.length} frames`);
    for (let i = 1; i < f.frames.length; i++) {
      assert.ok(f.frames[i].step > f.frames[i - 1].step, `${algorithm} frames out of order`);
    }
    for (const fr of f.frames) assert.equal(fr.grid.length, f.grid.length, `${algorithm} frame size`);
    // k vizinhos e a excecao declarada: a varredura vai ate o maior k, mas o
    // modelo entregue e o do melhor k por validacao, que raramente e o ultimo
    if (algorithm !== 'knn') {
      assert.deepEqual(f.frames[f.frames.length - 1].grid, f.grid, `${algorithm} last frame is not the final model`);
    }
  }
});

test('k nearest neighbours keeps the k that validated best, not the last one tried', () => {
  const f = fitClassic({algorithm: 'knn', dataset: 'circle', strength: 0.8});
  const best = f.curve.reduce((a, b) => (b.val > a.val ? b : a));
  assert.equal(f.final.step, best.step);
  assert.ok(f.final.val >= f.curve[f.curve.length - 1].val);
});
