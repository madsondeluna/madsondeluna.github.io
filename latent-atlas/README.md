# Ghost in the Fold

Protein language models, structure prediction and design, model by model. Static Next.js export served at `/latent-atlas/` on madsondeluna.com and built by the site workflow. Styled in Pure Design; the colour mode is shared with the site root through the `mode` key in `localStorage`. English at the root, Portuguese under `/pt`.

The directory and the route keep the `latent-atlas` identifier; only the displayed name changed.

## Commands

| Command | Effect |
| --- | --- |
| `npm ci` | Install (Node 22.13 or later) |
| `npm run dev` | Development server at `http://localhost:3000/latent-atlas/` |
| `npm run build` | Static export to `out/` with `basePath` `/latent-atlas` |
| `npm run typecheck` | Strict TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Numerical engine tests |

## Routes

| Route | Page |
| --- | --- |
| `/` | Taxonomy map, plus the gateway into the catalogue |
| `/start` | Three guided routes: newcomer, prediction, design |
| `/models` | Fourteen models, filterable by task |
| `/models/[slug]` | One model: teaching layer, architecture diagram, example, weights, sources |
| `/compare` | ESM-2 against ESM3 and ESM C, AlphaFold 2 against 3, ESMFold against ESMFold2 |
| `/pt/...` | The same atlas in Portuguese |
| `/exhibits/classical` | Logistic regression on linear, XOR or circular synthetic data |
| `/exhibits/neuron` | Inputs, weights, bias and sigmoid / step / ReLU activation |
| `/exhibits/deep` | Six-neuron tanh network trained by backpropagation |
| `/exhibits/language` | Masked and next-token objectives on a 12-sentence count model |
| `/exhibits/attention` | Q/K/V attention with three heads and a causal mask |
| `/exhibits/protein` | Amino-acid sequences, masking, pooling, ESM-2 / ProtBERT / ProtT5 / ESMFold |
| `/exhibits/finetuning` | Frozen probing, full adaptation and rank-1 LoRA on a 25-parameter network |
| `/glossary` | 61 terms with aliases, categories and examples |

## Content rules

Every displayed number traces to an entry in the `sources` array of `lib/atlas/models.ts`, tagged `journal`, `preprint`, `weights` or `code`. Checkpoint rows were checked against the Hugging Face API, not written from memory. Code examples in `lib/atlas/teaching.ts` were not executed in this repository and say so on the page.

Translation lives in `lib/atlas/pt.ts` and covers prose only. Slugs, years, repositories, licences and DOIs exist once, in `models.ts`, and are read from there in both languages. A missing translation falls back to English rather than rendering an empty field.

## Computation

All calculations run in the browser. `lib/museum/lab.ts` validates the settings with zod and calls `lib/museum/engine.ts`, which is deterministic: fixed seeds, 100 training and 60 validation points, at most 300 epochs. No pretrained model is loaded and no request leaves the page.

| Exhibit | Model | Trainable parameters |
| --- | --- | --- |
| Classical | Logistic regression | 3 |
| Deep | 2 inputs, 6 tanh units, sigmoid output | 25 |
| Fine-tuning, frozen | Pretrained encoder, new head | 7 |
| Fine-tuning, LoRA | Pretrained encoder, rank-1 update, new head | 15 |
| Fine-tuning, full | All weights | 25 |

The attention matrix uses fixed, untrained toy embeddings and projections. The language demo counts tokens from 12 displayed sentences. Protein embedding colours are schematic. See `docs/METHODOLOGY.md`.

## Structure

```text
app/                   Routes, layout, globals.css
components/museum/     Museum shell, experiments, glossary, mode switch
components/ui/         shadcn primitives (sidebar, tabs, slider, tooltip, dialog, input)
lib/museum/            engine.ts, lab.ts, content.ts, glossary.ts
pure/                  tokens.css, patterns.css, theme.css (Pure Design)
tests/                 engine.test.mjs
```

## References

* [Goodfellow, Bengio and Courville: Deep Learning](https://www.deeplearningbook.org/)
* [Vaswani et al.: Attention Is All You Need](https://arxiv.org/abs/1706.03762)
* [Devlin et al.: BERT](https://arxiv.org/abs/1810.04805)
* [Lin et al.: ESM-2 and ESMFold](https://www.science.org/doi/10.1126/science.ade2574)
* [Elnaggar et al.: ProtTrans](https://arxiv.org/abs/2007.06225)
* [Hu et al.: LoRA](https://arxiv.org/abs/2106.09685)
