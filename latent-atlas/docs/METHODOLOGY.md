# Experiment methodology

## Common conventions

JavaScript double-precision arithmetic is used. Randomness uses a deterministic 32-bit linear congruential generator. Training seeds and validation seeds differ, and comparisons reuse the same split. Validation data never updates parameters. A displayed validation result is not a final test result or a biological benchmark.

## Logistic regression and multilayer network

Inputs are uniform synthetic coordinates in [−1,1]². There are 100 training and 60 validation examples. Targets are:

* Linear: `x1 + 0.6*x2 > 0`.
* XOR: `x1*x2 < 0`, meaning opposite signs.
* Circle: `x1*x1 + x2*x2 < 0.45`.

Logistic regression uses `sigmoid(w·x+b)` with three trainable parameters. The neural-network demo uses six tanh hidden units and one sigmoid output, with 25 trainable parameters. The hidden layer illustrates nonlinear representation learning; it is deliberately much smaller and shallower than a modern deep model.

Binary cross-entropy is averaged over the full training batch. Backpropagation uses `p−y` at the sigmoid output and `1−h²` for the tanh derivative. The optimizer performs one full-batch gradient-descent step per epoch. No regularization, dropout, batching or adaptive optimizer is used. Predictions use a 0.5 class threshold. The heatmap samples a grid and is not an exact analytic contour plot.

## Transfer learning and rank-1 adaptation

Pretrain the same tiny network for 180 epochs at learning rate 0.35 on a separate synthetic linear source dataset with seed 81. Reset the output head deterministically. Train on the target XOR dataset with the same split used elsewhere.

* Frozen: update six output weights and one output bias only, for seven trainable parameters.
* Full: update all 25 base parameters.
* LoRA: freeze the 6×2 input weight matrix and hidden biases. Learn a 6-vector B and a 2-vector A, representing a rank-1 update BA, and train the seven head parameters. This gives 15 trainable parameters and 33 total stored model parameters. Scaling is one. B starts at zero and A starts nonzero, so the initial low-rank update is zero while B can receive gradients.

The initial source task and target task are mathematically defined synthetic rules. No protein feature names should be interpreted as trained solubility predictors. Frozen, full and low-rank strategies need not rank in the same order as they would on a real dataset.

## Attention

Token strings produce deterministic 4D toy vectors with sinusoidal position information. Only the first character influences identity in the toy embedding; this is intentionally not a real tokenizer or learned vocabulary embedding table. Each head uses different fixed trigonometric projection matrices.

Compute Q, K and V, then `S=QKᵀ/√4`. Future scores become negative infinity in causal mode. Stable softmax normalizes each row. The output is the matrix product `softmax(S)V`. The selected cell exposes both scaled score and normalized weight, and the inspector reports the query’s output vector.

The heads are untrained examples. Their weights do not demonstrate semantic relations or residue contacts. The architecture view describes concatenation, output projection, feed-forward transformations, skip connections and normalization, using original post-normalization block ordering. It does not claim that all Transformer variants share that exact ordering.

## Language objectives and BERT

The interactive probability demo counts tokens in 12 fixed English sentences. In next-token mode, it matches the preceding word. In masked mode, it matches available immediate left and right neighbors around one mask. When no context matches, it falls back to unigram counts. Add 0.1 to every vocabulary count, divide log counts by temperature, then apply softmax.

This illustrates the difference between objective types without executing BERT. BERT explanations cover bidirectional encoder context, masked-token selection and the original next-sentence objective. Original BERT selects 15% of token positions, then uses the 80% mask / 10% random / 10% unchanged policy within that selection.

## Protein sequence explorer

Accept 4–40 standard amino-acid letters. Whitespace is removed and letters are uppercased. Display identity, a simplified chemical grouping and the fraction of residues in AVILMFW. This grouping is explicit because hydrophobicity classification conventions differ. Charged-state descriptions depend on pH and environment.

Masking replaces one displayed identity with a question mark. The original target remains available in the explanatory inspector. No residue probabilities, learned embeddings, contact map or 3D coordinates are computed. Colored embedding cells are explicitly schematic. Mean pooling is presented as one possible sequence-level aggregation strategy.

## Real pLM adaptation workflow

A future production pLM service would require checkpoint-specific tokenization, real sequence embeddings, labeled task data and a separate model runtime. For a scientific evaluation, cluster and deduplicate sequences before splitting; account for homology and family overlap; tune only on training/validation data; reserve an untouched test set; compare descriptor and frozen-embedding baselines; report class-sensitive metrics and uncertainty. Regression, sequence classification and residue classification need different heads and losses.

The original research links appear with each gallery and in the README. Broad pedagogical definitions are explanatory paraphrases. The site makes no claim to have trained, benchmarked or deployed ESM-2, ProtBERT, ProtT5 or BERT itself.
