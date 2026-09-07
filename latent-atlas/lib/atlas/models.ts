// Catalogo de modelos. Cada numero exibido na tela sai de uma fonte listada
// em `sources`, e o `kind` diz o que a fonte e: revisado por pares, preprint,
// pagina do fabricante ou o cartao dos pesos. Nada aqui vem de memoria.

export type SourceKind = 'journal' | 'preprint' | 'vendor' | 'weights' | 'code';

export type Source = { label: string; url: string; kind: SourceKind };

/** Um no do diagrama. `main` forma a coluna central, na ordem em que aparece;
 *  `side` fica na calha direita, na linha do no a que se liga. Nao existe
 *  layout de grafo: a posicao e aritmetica, entao nada precisa medir o DOM. */
export type FlowNode = {
  id: string;
  title: string;
  lane: 'main' | 'side';
  attachesTo?: string;
  kicker: string;
  summary: string;
  detail: string;
  carries?: string;
  exhibit?: { slug: string; label: string };
};

export type Checkpoint = { repo: string; params: string; license: string; note?: string };

export type ModelEntry = {
  slug: string;
  name: string;
  year: string;
  task: string;
  family: string;
  tagline: string;
  what: string;
  standing: string;
  distinct: string[];
  limits: string;
  checkpoints: Checkpoint[];
  sources: Source[];
  flow?: FlowNode[];
};

export const tasks = [
  'Structure prediction',
  'Protein language model',
  'Inverse folding',
  'Backbone generation',
  'Variant effect',
] as const;

const af2: FlowNode[] = [
  {
    id: 'evidence',
    title: 'Sequence and evolutionary evidence',
    lane: 'main',
    kicker: 'Input',
    summary: 'One target sequence, a multiple sequence alignment and optional structural templates.',
    detail:
      'The alignment is the model’s view of evolution. Residues that mutate together across homologues tend to sit close together in space, and that signal is what carries the prediction when no template exists. Building the alignment is a database search, not a neural step, and on a new sequence it is often the slowest part of a run.',
    carries: 'Prepared evidence',
  },
  {
    id: 'embed',
    title: 'Input embedding and recycling',
    lane: 'main',
    kicker: 'Featurisation',
    summary: 'Alignment rows and residue pairs become two tensors: an MSA representation and a pair representation.',
    detail:
      'Everything downstream reads those two tensors. The pair representation is indexed by residue i and residue j, so it can hold a geometric statement about two positions before any coordinate exists. Recycling feeds the previous pass back in, which is how the network refines a structure it already drafted.',
    carries: 'Initial MSA and pair state',
  },
  {
    id: 'msa',
    title: 'Evoformer: MSA stream',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'Attention runs along a row, then down a column, so each residue reads its homologues and its neighbours.',
    detail:
      'Row attention compares positions inside one sequence. Column attention compares the same position across the alignment. The pair representation biases the row attention, which is the point where geometry starts steering the reading of evolution rather than only the reverse.',
    carries: 'Outer product mean',
    exhibit: { slug: 'attention', label: 'Run an attention head' },
  },
  {
    id: 'pair',
    title: 'Evoformer: pair stream',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'Triangle updates force the pair tensor to respect the triangle inequality between three residues.',
    detail:
      'If i is close to k and k is close to j, then i and j cannot be arbitrarily far apart. Triangle multiplication and triangle attention write that constraint into the network instead of leaving it to be learned from data alone. This block is the reason the pair representation behaves like a distance geometry and not like an unconstrained matrix.',
    carries: 'Single and pair representations',
  },
  {
    id: 'recycle',
    title: 'Recycle representations and geometry',
    lane: 'side',
    attachesTo: 'pair',
    kicker: 'Side path',
    summary: 'The output of one full pass re-enters the trunk as extra input.',
    detail:
      'Three recycles are the default. Each one gives the trunk a draft structure to react to, and the gradient is not carried through the loop, so the cost is inference time rather than training memory.',
  },
  {
    id: 'structure',
    title: 'Structure module',
    lane: 'main',
    kicker: 'Decoder',
    summary: 'Each residue becomes a rigid frame, moved by invariant point attention until backbone and sidechains land.',
    detail:
      'The frames start at the origin, all identical, and the module walks them into place. Invariant point attention operates on points expressed in each residue’s local frame, so the whole operation commutes with rotating or translating the protein. Torsion angles then place the sidechain atoms.',
    carries: 'Atom coordinates',
  },
  {
    id: 'confidence',
    title: 'Confidence heads',
    lane: 'side',
    attachesTo: 'structure',
    kicker: 'Side path',
    summary: 'pLDDT scores each residue; PAE scores the relative placement of two residues.',
    detail:
      'pLDDT below roughly 50 often marks a segment that is disordered rather than badly predicted. PAE is what tells you whether two confident domains are confidently positioned with respect to each other, which a per-residue score cannot say.',
  },
];

const af3: FlowNode[] = [
  {
    id: 'tokens',
    title: 'Tokenised complex',
    lane: 'main',
    kicker: 'Input',
    summary: 'Proteins, nucleic acids, ligands, ions and modified residues enter as one token set.',
    detail:
      'A standard residue is one token. A ligand or a modified residue is tokenised per atom, so a single representation covers chemistry that AlphaFold2 had no slot for. This is the change that makes one model answer questions previously split between folding tools and docking tools.',
    carries: 'Token and pair state',
  },
  {
    id: 'msa-module',
    title: 'MSA module',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'A short stack summarises the alignment into the pair representation, then steps aside.',
    detail:
      'Evolutionary evidence still enters, but it is no longer carried through the whole trunk. The alignment is compressed early and the rest of the network reasons over tokens and pairs, which reduces how much of the computation depends on alignment depth.',
    carries: 'Pair representation',
  },
  {
    id: 'pairformer',
    title: 'Pairformer',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'Triangle updates and attention run on single and pair representations, with no MSA stream.',
    detail:
      'Compared with the Evoformer, the MSA representation is gone from the deep stack and the triangle machinery stays. That is the architectural summary of the difference: the same geometric reasoning, applied to a representation that no longer needs an alignment sitting inside it.',
    carries: 'Conditioning',
  },
  {
    id: 'diffusion',
    title: 'Diffusion module',
    lane: 'main',
    kicker: 'Decoder',
    summary: 'Atom coordinates are generated by denoising, conditioned on the trunk output.',
    detail:
      'Instead of one deterministic pass through a structure module, noisy coordinates are refined over repeated steps. Sampling several times gives several structures rather than one answer with an error bar, and the generator works directly on atoms, so it does not need per-residue frames or torsion parametrisation.',
    carries: 'Sampled structures',
  },
  {
    id: 'ranking',
    title: 'Confidence and ranking',
    lane: 'side',
    attachesTo: 'diffusion',
    kicker: 'Side path',
    summary: 'Predicted scores rank the samples and flag likely disorder or hallucination.',
    detail:
      'A generative decoder can produce a confident-looking arrangement for a region that has none, so ranking the samples is part of the method rather than a convenience layered on top.',
  },
];

const esm2: FlowNode[] = [
  {
    id: 'sequence',
    title: 'One sequence, no alignment',
    lane: 'main',
    kicker: 'Input',
    summary: 'Amino acids are tokenised directly. No homologue search runs at inference.',
    detail:
      'This is the whole practical argument for a protein language model. Where a folding pipeline spends minutes searching databases for relatives, the language model reads the sequence it was given. The evolutionary signal is not absent, it was absorbed into the weights during pretraining.',
    carries: 'Token embeddings',
  },
  {
    id: 'mask',
    title: 'Masked language modelling',
    lane: 'main',
    kicker: 'Objective',
    summary: 'Residues are hidden at random and the model reconstructs them from both sides of the sequence.',
    detail:
      'The objective is the same one BERT uses on text. To fill a masked position well the network has to represent which residues are compatible with that structural and functional context, and that pressure is what produces representations useful for tasks nobody trained it on.',
    carries: 'Contextual representations',
    exhibit: { slug: 'language', label: 'Fill a masked position' },
  },
  {
    id: 'transformer',
    title: 'Bidirectional transformer stack',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'Attention layers mix information between every pair of positions.',
    detail:
      'Attention maps in a trained protein language model correlate with residue contacts, which is why the internal states can be read as geometry even though nothing about geometry was in the loss. Depth and width are the two knobs the ESM-2 family varies, from eight million to fifteen billion parameters.',
    carries: 'Per-residue vectors',
    exhibit: { slug: 'protein', label: 'Explore residue representations' },
  },
  {
    id: 'heads',
    title: 'Representations and logits',
    lane: 'main',
    kicker: 'Output',
    summary: 'Per-residue vectors, a pooled sequence vector and amino-acid probabilities.',
    detail:
      'Downstream work almost always uses the hidden states rather than the logits: a small head on top of frozen embeddings, or a fine-tune of the last layers. Turning these vectors into coordinates needs a separate folding model, which is exactly what ESMFold is.',
  },
  {
    id: 'frozen',
    title: 'Frozen features or fine-tuning',
    lane: 'side',
    attachesTo: 'heads',
    kicker: 'Side path',
    summary: 'Freeze the encoder and train a head, or update the encoder itself.',
    detail:
      'With a few hundred labelled examples the frozen route usually wins, because a full fine-tune of a large encoder overfits. Low-rank adaptation sits between the two.',
    exhibit: { slug: 'finetuning', label: 'Compare frozen, full and LoRA' },
  },
];

const esmfold: FlowNode[] = [
  {
    id: 'plm',
    title: 'Frozen ESM-2 encoder',
    lane: 'main',
    kicker: 'Input',
    summary: 'A pretrained language model reads the single sequence and hands over its internal states.',
    detail:
      'The language model is not trained further here. Its attention maps and hidden states stand in for the alignment that AlphaFold2 would have built, which is what removes the database search from the critical path.',
    carries: 'Sequence and pair features',
  },
  {
    id: 'trunk',
    title: 'Folding trunk',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'A learned stack refines single and pair representations from the language model features.',
    detail:
      'The trunk is smaller than the Evoformer and does not process an alignment. It converts language model features into the two representations that a geometric decoder expects.',
    carries: 'Refined representations',
  },
  {
    id: 'sm',
    title: 'Structure module',
    lane: 'main',
    kicker: 'Decoder',
    summary: 'The AlphaFold2-style geometric decoder places atoms.',
    detail:
      'Reusing this decoder is deliberate: the contribution of ESMFold is the route into it, not a new way out of it.',
    carries: 'Atom coordinates',
  },
  {
    id: 'atlas',
    title: 'Metagenomic scale',
    lane: 'side',
    attachesTo: 'sm',
    kicker: 'Why it mattered',
    summary: 'Dropping the alignment search made folding hundreds of millions of sequences practical.',
    detail:
      'Speed changed what could be attempted. The ESM Metagenomic Atlas exists because the per-sequence cost fell far enough for a survey of unknown metagenomic proteins to be worth running.',
  },
];

const esm3: FlowNode[] = [
  {
    id: 'tracks',
    title: 'Three tracks, one model',
    lane: 'main',
    kicker: 'Input',
    summary: 'Sequence, structure and function enter as parallel token tracks over the same positions.',
    detail:
      'Position seventeen can carry an amino acid, a structural token, a function annotation, or any subset of the three. A prompt is whatever you choose to leave visible, which is what makes one model answer folding, design and annotation questions without task-specific heads.',
    carries: 'Multimodal tokens',
  },
  {
    id: 'tokenizer',
    title: 'Geometric tokenizer',
    lane: 'side',
    attachesTo: 'tracks',
    kicker: 'Side path',
    summary: 'Local backbone geometry is compressed into a discrete vocabulary.',
    detail:
      'A structure becomes a sequence of codes, and codes can be masked and predicted exactly like amino acids. A separate decoder turns predicted codes back into coordinates, so the tokenizer is a lossy but invertible bridge between geometry and language modelling.',
  },
  {
    id: 'stack',
    title: 'Shared transformer',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'One stack predicts logits for every track at once.',
    detail:
      'Because the tracks share a trunk, evidence in one modality moves the prediction in the others. Giving the model a structural motif changes which sequences it considers likely at those positions, and giving it a function keyword does the same.',
    carries: 'Per-track logits',
  },
  {
    id: 'unmask',
    title: 'Iterative unmasking',
    lane: 'main',
    kicker: 'Generation',
    summary: 'Masked positions are filled a few at a time, each pass conditioning the next.',
    detail:
      'Generation is not left to right. The model picks positions to commit, writes them, and re-reads the whole design, which is how a fixed motif and a free scaffold can be generated in one process.',
    carries: 'Completed tracks',
  },
  {
    id: 'decode',
    title: 'Structure decoder',
    lane: 'side',
    attachesTo: 'unmask',
    kicker: 'Side path',
    summary: 'Structural tokens are converted back to backbone coordinates.',
    detail:
      'Without this step the structure track is a code sequence, not a model you can open in a viewer.',
  },
];

const mpnn: FlowNode[] = [
  {
    id: 'backbone',
    title: 'A backbone, no sequence',
    lane: 'main',
    kicker: 'Input',
    summary: 'Only the coordinates of the main chain are given. The amino acids are the unknown.',
    detail:
      'This is folding read backwards. Structure prediction asks which shape a sequence takes; inverse folding asks which sequences would hold this shape. Design pipelines need the second question answered, because a generated backbone arrives with no sequence at all.',
    carries: 'Residue graph',
  },
  {
    id: 'graph',
    title: 'Neighbour graph encoder',
    lane: 'main',
    kicker: 'Encoder',
    summary: 'Each residue attends to its nearest neighbours in space, described by distances and orientations.',
    detail:
      'Using a local graph rather than the full matrix keeps the cost manageable and matches the physics: what an amino acid can be is decided mostly by the atoms packed against it. Features are geometric, so the encoder is unchanged by rotating the input.',
    carries: 'Structure-aware node states',
  },
  {
    id: 'decoder',
    title: 'Order-agnostic decoder',
    lane: 'main',
    kicker: 'Decoder',
    summary: 'Residues are decided one at a time, in a random order, each conditioned on those already fixed.',
    detail:
      'Decoding in an arbitrary order is what allows part of a sequence to be held fixed while the rest is designed. A binding site can be frozen and the scaffold rewritten around it, with the frozen residues visible to every later decision.',
    carries: 'Amino-acid probabilities',
  },
  {
    id: 'ligand',
    title: 'Non-protein atoms',
    lane: 'side',
    attachesTo: 'graph',
    kicker: 'Successor',
    summary: 'LigandMPNN adds ligands, nucleotides and metals to the same graph.',
    detail:
      'ProteinMPNN sees only protein atoms, so a residue that exists to hold a zinc ion looks unexplained to it. LigandMPNN encodes the non-protein context and recovers native residues far better at those positions.',
  },
];

const rfd: FlowNode[] = [
  {
    id: 'spec',
    title: 'Design specification',
    lane: 'main',
    kicker: 'Input',
    summary: 'A target to bind, a motif to keep, a symmetry to obey, or nothing at all.',
    detail:
      'Unconditional generation is the simplest case and the least useful one. The value is in the constraints: hold these catalytic residues, present this epitope, build a C3 assembly.',
    carries: 'Conditioning',
  },
  {
    id: 'noise',
    title: 'Noised residue frames',
    lane: 'main',
    kicker: 'Diffusion',
    summary: 'Start from random positions and orientations for every residue.',
    detail:
      'The diffusion runs on frames, meaning a translation and a rotation per residue, rather than on raw atoms. Backbone geometry follows from the frames, so the generator never has to keep bond lengths legal by itself.',
    carries: 'Noisy backbone',
  },
  {
    id: 'denoise',
    title: 'RoseTTAFold as denoiser',
    lane: 'main',
    kicker: 'Trunk',
    summary: 'A pretrained structure predictor is fine-tuned to remove noise one step at a time.',
    detail:
      'Starting from a network that already knows what a protein looks like is the reason this works with the data available. A denoiser trained from scratch would have to learn protein geometry from the diffusion objective alone.',
    carries: 'Backbone coordinates',
  },
  {
    id: 'seq',
    title: 'Sequence design',
    lane: 'side',
    attachesTo: 'denoise',
    kicker: 'Next step',
    summary: 'The output is a backbone with no sequence, so an inverse folding model runs next.',
    detail:
      'In practice the pair is RFdiffusion then ProteinMPNN, followed by a folding model to check that the designed sequence returns the intended shape before anything is ordered.',
  },
  {
    id: 'filter',
    title: 'In silico filtering',
    lane: 'main',
    kicker: 'Selection',
    summary: 'Designs are refolded and ranked before synthesis.',
    detail:
      'Success rates are reported per tested design, so the filter is part of the method. A pipeline that generates ten thousand backbones and orders ninety-six is doing most of its selection here.',
  },
];

export const models: ModelEntry[] = [
  {
    slug: 'alphafold2',
    name: 'AlphaFold 2',
    year: '2021',
    task: 'Structure prediction',
    family: 'DeepMind',
    tagline: 'Evolution in, coordinates out.',
    what:
      'Predicts the structure of a protein from its sequence, an alignment of its homologues and optional templates. The Evoformer exchanges information between the alignment and residue pairs; a geometric structure module turns those representations into atoms.',
    standing:
      'The CASP14 result in 2020 and the Nature paper in 2021 are the point where computational structure prediction became something experimentalists use by default. The 2024 Nobel Prize in Chemistry cites this work.',
    distinct: [
      'The pair representation carries triangle constraints, so geometry is enforced by the architecture and not only learned.',
      'Invariant point attention lets the decoder move residues in three dimensions without breaking equivariance.',
      'The alignment search, not the network, is often the slowest part of a prediction.',
    ],
    limits:
      'It predicts one structure per input. Alternative conformations, the effect of a point mutation and the behaviour of disordered regions are outside what a single confident prediction can express.',
    checkpoints: [
      { repo: 'google-deepmind/alphafold', params: 'Open weights via the reference implementation', license: 'Apache-2.0 code, CC BY 4.0 parameters' },
      { repo: 'aqlaboratory/openfold', params: 'Trainable reimplementation', license: 'Apache-2.0' },
    ],
    sources: [
      { label: 'Jumper et al. 2021, Nature. Highly accurate protein structure prediction with AlphaFold', url: 'https://doi.org/10.1038/s41586-021-03819-2', kind: 'journal' },
      { label: 'AlphaFold reference implementation', url: 'https://github.com/google-deepmind/alphafold', kind: 'code' },
    ],
    flow: af2,
  },
  {
    slug: 'alphafold3',
    name: 'AlphaFold 3',
    year: '2024',
    task: 'Structure prediction',
    family: 'DeepMind',
    tagline: 'One model for the whole complex.',
    what:
      'Predicts the joint structure of complexes containing proteins, nucleic acids, small molecules, ions and modified residues. A Pairformer reasons over tokens and pairs, and a diffusion module generates atom coordinates.',
    standing:
      'Reported accuracy above specialised docking tools for protein and ligand interactions, above nucleic-acid-specific predictors, and above AlphaFold-Multimer 2.3 for antibody and antigen pairs, within one framework.',
    distinct: [
      'The MSA representation leaves the deep trunk. The Pairformer keeps the triangle updates and drops the alignment stream.',
      'The deterministic structure module is replaced by diffusion over atoms, so sampling returns a set of structures.',
      'Ligands and modified residues are tokenised per atom instead of being absent from the representation.',
    ],
    limits:
      'A generative decoder can produce plausible geometry for regions that have none, which is why confidence ranking is part of the method. Open reimplementations exist because the original weights are not freely redistributable.',
    checkpoints: [
      { repo: 'bytedance/Protenix', params: '368M in Protenix-v1', license: 'Open source', note: 'Independent reimplementation of the AlphaFold3 approach' },
      { repo: 'boltzgen/boltzgen-1', params: 'Open weights', license: 'MIT', note: 'Related open all-atom generative model' },
    ],
    sources: [
      { label: 'Abramson et al. 2024, Nature. Accurate structure prediction of biomolecular interactions with AlphaFold 3', url: 'https://doi.org/10.1038/s41586-024-07487-w', kind: 'journal' },
      { label: 'Protenix-v1 preprint, 2026', url: 'https://www.biorxiv.org/content/10.64898/2026.02.05.703733v3', kind: 'preprint' },
    ],
    flow: af3,
  },
  {
    slug: 'esm2',
    name: 'ESM-2',
    year: '2023',
    task: 'Protein language model',
    family: 'Meta AI',
    tagline: 'Read enough proteins and structure falls out of the reading.',
    what:
      'A bidirectional transformer trained to reconstruct masked amino acids from unaligned sequences. It produces contextual per-residue representations and amino-acid logits. Converting those representations into coordinates requires ESMFold, which is a separate model.',
    standing:
      'The scaling study that made masked protein language models a standard component. Later work initialises other models from ESM-2 weights and uses its embeddings as features.',
    distinct: [
      'No alignment at inference. Evolutionary information lives in the weights.',
      'Checkpoints from 8M to 15B parameters make the scaling behaviour visible.',
      'Attention maps correlate with residue contacts although no structural term appears in the loss.',
    ],
    limits:
      'It is an encoder. It does not generate structures, and its per-residue logits are a poor proxy for fitness in cases where function depends on more than sequence likelihood.',
    checkpoints: [
      { repo: 'facebook/esm2_t33_650M_UR50D', params: '650M', license: 'MIT', note: 'The default choice for embeddings' },
      { repo: 'facebook/esm2_t12_35M_UR50D', params: '35M', license: 'MIT', note: 'Small enough for a laptop' },
      { repo: 'facebook/esm2_t36_3B_UR50D', params: '3B', license: 'MIT' },
      { repo: 'facebook/esm2_t48_15B_UR50D', params: '15B', license: 'MIT', note: 'Rarely worth the memory over 3B' },
    ],
    sources: [
      { label: 'Lin et al. 2023, Science. Evolutionary-scale prediction of atomic-level protein structure with a language model', url: 'https://doi.org/10.1126/science.ade2574', kind: 'journal' },
      { label: 'ESM-2 650M weights', url: 'https://huggingface.co/facebook/esm2_t33_650M_UR50D', kind: 'weights' },
    ],
    flow: esm2,
  },
  {
    slug: 'esmfold',
    name: 'ESMFold',
    year: '2023',
    task: 'Structure prediction',
    family: 'Meta AI',
    tagline: 'Fold without searching for relatives.',
    what:
      'Predicts a structure from a single sequence with no alignment search at query time. A frozen ESM-2 supplies sequence representations to a folding trunk and a structure module derived from AlphaFold2.',
    standing:
      'Made the language-model route to structure practical at the scale of metagenomic surveys. It is a structure predictor built on ESM-2, not another name for the language model.',
    distinct: [
      'The alignment search disappears, which is where most of the speed comes from.',
      'The language model is frozen. Only the folding trunk is trained.',
      'Accuracy trails alignment-based prediction on targets with deep, informative alignments.',
    ],
    limits:
      'When a rich alignment exists, the evidence it carries is real and a model that ignores it gives that up. Single-sequence folding is a trade, not a free improvement.',
    checkpoints: [{ repo: 'facebook/esmfold_v1', params: 'ESM-2 3B plus folding trunk', license: 'MIT' }],
    sources: [
      { label: 'Lin et al. 2023, Science. Evolutionary-scale prediction of atomic-level protein structure with a language model', url: 'https://doi.org/10.1126/science.ade2574', kind: 'journal' },
      { label: 'ESMFold weights', url: 'https://huggingface.co/facebook/esmfold_v1', kind: 'weights' },
    ],
    flow: esmfold,
  },
  {
    slug: 'esm3',
    name: 'ESM3',
    year: '2025',
    task: 'Protein language model',
    family: 'EvolutionaryScale',
    tagline: 'Sequence, structure and function as one masked prediction.',
    what:
      'A generative masked model over three parallel tracks. A geometric tokenizer turns local backbone environments into discrete codes; a shared transformer predicts logits for every track; iterative unmasking fills the positions you left open.',
    standing:
      'The Science paper reports a generated fluorescent protein at 58 percent sequence identity to known fluorescent proteins, which the authors frame as an estimate equivalent to a large evolutionary distance rather than a literal simulation.',
    distinct: [
      'Structure is a token track, not an output head bolted onto a sequence model.',
      'A prompt can mix modalities: fix a motif, name a function, leave the rest masked.',
      'Generation order is chosen by the model rather than running left to right.',
    ],
    limits:
      'Results reported for the largest model should not be attributed to the small open checkpoint. The evolutionary-distance framing is an estimate, and the open weights are the smallest member of the family.',
    checkpoints: [
      { repo: 'biohub/esm3-sm-open-v1', params: '1.4B', license: 'Non-commercial community licence', note: 'Formerly published under EvolutionaryScale' },
    ],
    sources: [
      { label: 'Hayes et al. 2025, Science. Simulating 500 million years of evolution with a language model', url: 'https://doi.org/10.1126/science.ads0018', kind: 'journal' },
      { label: 'ESM3 open weights', url: 'https://huggingface.co/biohub/esm3-sm-open-v1', kind: 'weights' },
    ],
    flow: esm3,
  },
  {
    slug: 'proteinmpnn',
    name: 'ProteinMPNN',
    year: '2022',
    task: 'Inverse folding',
    family: 'Baker lab',
    tagline: 'Given the shape, which sequences hold it?',
    what:
      'Proposes amino-acid sequences compatible with a supplied backbone. Neighbouring residues are encoded as a graph, then identities are predicted in an arbitrary autoregressive order, keeping structural context for positions not yet decided.',
    standing:
      'The structure-conditioned sequence design model that design pipelines were built around, with experimental validation across several protein architectures and direct reuse in LigandMPNN and binder design workflows.',
    distinct: [
      'Arbitrary decoding order is what allows a motif to be held fixed while the scaffold is redesigned.',
      'The encoder reads geometry only, so it does not need the native sequence it is replacing.',
      'It is small and fast enough to run thousands of designs per backbone.',
    ],
    limits:
      'It models protein atoms alone. Residues whose job is to coordinate a metal or hold a ligand look unexplained, which is the gap LigandMPNN closes.',
    checkpoints: [
      { repo: 'dauparas/ProteinMPNN', params: 'About 2M', license: 'MIT' },
      { repo: 'dauparas/LigandMPNN', params: 'Ligand-aware successor', license: 'MIT' },
    ],
    sources: [
      { label: 'Dauparas et al. 2022, Science. Robust deep learning-based protein sequence design using ProteinMPNN', url: 'https://doi.org/10.1126/science.add2187', kind: 'journal' },
      { label: 'Dauparas et al. 2025, Nature Methods. Atomic context-conditioned protein sequence design using LigandMPNN', url: 'https://doi.org/10.1038/s41592-025-02626-1', kind: 'journal' },
    ],
    flow: mpnn,
  },
  {
    slug: 'rfdiffusion',
    name: 'RFdiffusion',
    year: '2023',
    task: 'Backbone generation',
    family: 'Baker lab',
    tagline: 'Denoise until a protein appears.',
    what:
      'Generates protein backbones from design constraints by fine-tuning RoseTTAFold to denoise residue positions and orientations. It supports binder design, symmetric assemblies and motif scaffolding. Sequence design is a separate step downstream.',
    standing:
      'Joined a pretrained structure predictor to generative diffusion and tested diverse designs experimentally. Later catalytic-motif scaffolding methods build on it directly.',
    distinct: [
      'Diffusion runs on residue frames, so backbone geometry stays legal without extra constraints.',
      'The denoiser starts from a network that already knows protein structure.',
      'The output has no sequence. ProteinMPNN and a folding check complete the pipeline.',
    ],
    limits:
      'Success is reported per tested design, and in silico filtering does much of the work. RFdiffusion2 removed the requirement to specify residue positions for a catalytic motif, scaffolding all 41 active sites in its benchmark against 16 for earlier methods.',
    checkpoints: [
      { repo: 'RosettaCommons/RFdiffusion', params: 'Open weights', license: 'BSD' },
      { repo: 'dn6/RFDiffusion-3', params: 'All-atom successor', license: 'See repository', note: 'Community mirror' },
    ],
    sources: [
      { label: 'Watson et al. 2023, Nature. De novo design of protein structure and function with RFdiffusion', url: 'https://doi.org/10.1038/s41586-023-06415-8', kind: 'journal' },
      { label: 'Ahern et al. 2025, Nature Methods. Atom-level enzyme active site scaffolding using RFdiffusion2', url: 'https://doi.org/10.1038/s41592-025-02975-x', kind: 'journal' },
    ],
    flow: rfd,
  },
  {
    slug: 'esmc',
    name: 'ESM C',
    year: '2026',
    task: 'Protein language model',
    family: 'Biohub',
    tagline: 'The representation line, scaled further.',
    what:
      'A transformer encoder with pre-layer-norm, rotary embeddings and SwiGLU activations, trained on sequences from UniRef, MGnify and the Joint Genome Institute clustered at 70 percent identity. Context reaches 2048 tokens after a second training stage.',
    standing:
      'Positioned as the representation family beside the generative ESM3 line. The 6B checkpoint is the encoder that ESMFold2 reads.',
    distinct: [
      'Three sizes, 300M, 600M and 6B, with 30, 36 and 80 layers.',
      'Training ran in two stages: one million steps at context 512, then 500 thousand at context 2048.',
      'The 6B checkpoint reports 2.37e23 training FLOPs on its model card.',
    ],
    limits:
      'It is an encoder, so it produces embeddings and masked-token logits rather than structures. Comparative claims against ESM-2 come from the authors and their preprint, not from an independent evaluation.',
    checkpoints: [
      { repo: 'biohub/ESMC-300M', params: '300M, 30 layers', license: 'MIT and other terms' },
      { repo: 'biohub/ESMC-600M', params: '600M, 36 layers', license: 'MIT and other terms' },
      { repo: 'biohub/ESMC-6B', params: '6B, 80 layers', license: 'MIT and other terms' },
    ],
    sources: [
      { label: 'Candido et al. 2026, preprint. Language Modeling Materializes a World Model of Protein Biology', url: 'https://doi.org/10.64898/2026.06.03.729735', kind: 'preprint' },
      { label: 'ESMC-6B model card', url: 'https://huggingface.co/biohub/ESMC-6B', kind: 'weights' },
    ],
  },
  {
    slug: 'esmfold2',
    name: 'ESMFold2',
    year: '2026',
    task: 'Structure prediction',
    family: 'Biohub',
    tagline: 'A language model encoder with an all-atom diffusion decoder.',
    what:
      'Predicts all-atom structures of proteins and their complexes from ESM C representations, with an optional alignment for difficult targets. It does not reuse the AlphaFold2-style structure module that ESMFold ended in.',
    standing:
      'The preprint reports complex prediction above established methods, including antibody and antigen interactions, and binder discovery with nanomolar affinities for miniproteins and single-chain antibodies.',
    distinct: [
      'The alignment becomes optional rather than absent or required.',
      'The decoder is diffusion over atoms, which is the same shift AlphaFold3 made.',
      'Inverting the model is used as a design procedure, not only a prediction one.',
    ],
    limits:
      'A preprint, not yet peer reviewed. The published experimental checkpoint is a 0.2B parameter fast variant released for reproducibility, and its card recommends the main model for research use.',
    checkpoints: [
      { repo: 'biohub/ESMFold2-Experimental-Fast', params: '0.2B', license: 'MIT', note: 'Experimental release; single-sequence or MSA-conditioned' },
    ],
    sources: [
      { label: 'Candido et al. 2026, preprint. Language Modeling Materializes a World Model of Protein Biology', url: 'https://doi.org/10.64898/2026.06.03.729735', kind: 'preprint' },
      { label: 'ESMFold2 experimental weights', url: 'https://huggingface.co/biohub/ESMFold2-Experimental-Fast', kind: 'weights' },
    ],
  },
  {
    slug: 'ligandmpnn',
    name: 'LigandMPNN',
    year: '2025',
    task: 'Inverse folding',
    family: 'Baker lab',
    tagline: 'Sequence design that can see the ligand.',
    what:
      'Extends structure-conditioned sequence design to every non-protein component of a system: small molecules, nucleotides and metals. It returns sidechain conformations along with sequences.',
    standing:
      'Native sequence recovery at residues contacting small molecules reaches 63.3 percent, against 50.5 percent for ProteinMPNN and 50.4 percent for Rosetta. At metal-contacting residues the figures are 77.5, 40.6 and 36.0 percent.',
    distinct: [
      'Non-protein atoms enter the graph instead of being deleted from it.',
      'Sidechain packing comes with the sequence, so binding can be inspected rather than assumed.',
      'More than 100 designed small-molecule and DNA-binding proteins were validated experimentally, with four crystal structures.',
    ],
    limits:
      'It inherits the assumption that the supplied backbone and ligand pose are correct. Errors upstream propagate silently into the designed sequence.',
    checkpoints: [{ repo: 'dauparas/LigandMPNN', params: 'Several noise levels', license: 'MIT' }],
    sources: [
      { label: 'Dauparas et al. 2025, Nature Methods. Atomic context-conditioned protein sequence design using LigandMPNN', url: 'https://doi.org/10.1038/s41592-025-02626-1', kind: 'journal' },
    ],
  },
  {
    slug: 'rfdiffusion2',
    name: 'RFdiffusion2',
    year: '2025',
    task: 'Backbone generation',
    family: 'Baker lab',
    tagline: 'Enzymes from a geometry, not from a residue numbering.',
    what:
      'Designs scaffolds directly from the geometry of catalytic functional groups, without specifying which sequence positions those residues occupy and without inverse rotamer generation.',
    standing:
      'Scaffolded all 41 active sites in its benchmark, against 16 for previous methods. Active enzymes were identified for three catalytic mechanisms after testing fewer than 96 sequences in each case.',
    distinct: [
      'Unindexed atomic motifs let the model choose where in the chain a catalytic residue lands.',
      'The specification is a transition-state geometry rather than a residue list.',
      'It targets enzyme design specifically, where earlier scaffolding methods mostly failed.',
    ],
    limits:
      'Catalytic activity in a screen of under 96 designs is a strong result for design, and still far from an optimised enzyme. Reported turnover numbers come from individual case studies.',
    checkpoints: [{ repo: 'RosettaCommons/RFdiffusion2', params: 'See repository', license: 'See repository' }],
    sources: [
      { label: 'Ahern et al. 2025, Nature Methods. Atom-level enzyme active site scaffolding using RFdiffusion2', url: 'https://doi.org/10.1038/s41592-025-02975-x', kind: 'journal' },
    ],
  },
  {
    slug: 'prottrans',
    name: 'ProtT5 and ProtBERT',
    year: '2022',
    task: 'Protein language model',
    family: 'Rostlab',
    tagline: 'The encoders that were there first.',
    what:
      'A family of transformers trained on UniRef and BFD with the objectives of their text counterparts. The T5 encoder is the part normally used, and its per-residue embeddings feed small supervised heads.',
    standing:
      'Established that language models trained on protein sequences produce features carrying structural information, and that the embeddings transfer to secondary structure and localisation prediction without alignments.',
    distinct: [
      'ProtT5 embeddings remain a strong baseline for small labelled datasets.',
      'The encoder is used alone; the decoder half is normally discarded.',
      'Medium-sized encoders often match much larger ones once the downstream dataset is small.',
    ],
    limits:
      'Older tokenisation and training data than the ESM line. For new work these are baselines rather than defaults.',
    checkpoints: [
      { repo: 'Rostlab/prot_t5_xl_uniref50', params: '3B, encoder used alone', license: 'See model card' },
      { repo: 'Rostlab/prot_bert', params: '420M', license: 'See model card' },
    ],
    sources: [
      { label: 'Elnaggar et al. 2022, IEEE TPAMI. ProtTrans: toward understanding the language of life through self-supervised learning', url: 'https://doi.org/10.1109/TPAMI.2021.3095381', kind: 'journal' },
      { label: 'ProtT5-XL weights', url: 'https://huggingface.co/Rostlab/prot_t5_xl_uniref50', kind: 'weights' },
    ],
  },
  {
    slug: 'saprot',
    name: 'SaProt',
    year: '2024',
    task: 'Protein language model',
    family: 'Westlake',
    tagline: 'One token for the residue and its local shape.',
    what:
      'A masked language model over a structure-aware vocabulary. Each position carries an amino acid combined with a Foldseek structural alphabet symbol, so sequence and local geometry share one token.',
    standing:
      'A widely downloaded structure-aware encoder, trained on predicted structures from the AlphaFold database as well as experimental ones.',
    distinct: [
      'The structural alphabet comes from Foldseek, so the model needs a structure at input time.',
      'It sits between a sequence-only encoder and a multimodal generative model.',
      'Two checkpoint lines exist, one trained on predicted structures and one on the Protein Data Bank.',
    ],
    limits:
      'Requires a structure, predicted or experimental, which is a heavier input requirement than ESM-2. Errors in a predicted structure enter the tokens directly.',
    checkpoints: [
      { repo: 'westlake-repl/SaProt_650M_AF2', params: '650M', license: 'MIT' },
      { repo: 'westlake-repl/SaProt_650M_PDB', params: '650M', license: 'MIT' },
    ],
    sources: [{ label: 'SaProt 650M model card', url: 'https://huggingface.co/westlake-repl/SaProt_650M_AF2', kind: 'weights' }],
  },
  {
    slug: 'alphamissense',
    name: 'AlphaMissense',
    year: '2023',
    task: 'Variant effect',
    family: 'DeepMind',
    tagline: 'Structure-aware scoring of single amino-acid changes.',
    what:
      'Classifies missense variants as likely benign or likely pathogenic across the proteome, adapting an AlphaFold-derived model with population frequency data rather than clinical labels.',
    standing:
      'Provided proteome-wide predictions for human missense variants, a scale that experimental characterisation cannot reach.',
    distinct: [
      'Trained without clinical annotations, which keeps the evaluation against clinical databases meaningful.',
      'Uses structural context, so it separates buried positions from exposed ones.',
      'Outputs a calibrated score rather than a binary call.',
    ],
    limits:
      'A score is computational evidence within a variant interpretation framework, not a diagnosis. Its predictions concern single amino-acid substitutions only.',
    checkpoints: [{ repo: 'google-deepmind/alphamissense', params: 'Predictions released as tables', license: 'CC BY-NC-SA 4.0' }],
    sources: [
      { label: 'Cheng et al. 2023, Science. Accurate proteome-wide missense variant effect prediction with AlphaMissense', url: 'https://doi.org/10.1126/science.adg7492', kind: 'journal' },
    ],
  },
];

export const byTask = (task: string) => models.filter((m) => m.task === task);
export const findModel = (slug: string) => models.find((m) => m.slug === slug);

export type Comparison = {
  slug: string;
  title: string;
  question: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
  reading: string;
  sources: Source[];
};

export const comparisons: Comparison[] = [
  {
    slug: 'esm-family',
    title: 'ESM-2, ESM3 and ESM C',
    question: 'Three models with the same prefix that answer different questions.',
    columns: ['ESM-2', 'ESM3', 'ESM C'],
    rows: [
      { label: 'What it is', cells: ['Masked sequence encoder', 'Multimodal generative model', 'Masked sequence encoder'] },
      { label: 'Tracks', cells: ['Sequence', 'Sequence, structure, function', 'Sequence'] },
      { label: 'Generates', cells: ['Masked-token logits', 'Sequence, structure and annotation', 'Masked-token logits'] },
      { label: 'Open sizes', cells: ['8M to 15B', '1.4B open checkpoint', '300M, 600M, 6B'] },
      { label: 'Context', cells: ['1024 tokens', 'See model card', '2048 tokens'] },
      { label: 'Use it for', cells: ['Embeddings and baselines', 'Prompted design', 'Embeddings at larger scale'] },
      { label: 'Published as', cells: ['Science 2023', 'Science 2025', 'Preprint 2026'] },
    ],
    reading:
      'ESM3 is the generative line and ESM C the representation line. ESM-2 remains the reference point both are measured against, and it is still the checkpoint most downstream code loads.',
    sources: [
      { label: 'Lin et al. 2023, Science', url: 'https://doi.org/10.1126/science.ade2574', kind: 'journal' },
      { label: 'Hayes et al. 2025, Science', url: 'https://doi.org/10.1126/science.ads0018', kind: 'journal' },
      { label: 'ESMC-6B model card', url: 'https://huggingface.co/biohub/ESMC-6B', kind: 'weights' },
    ],
  },
  {
    slug: 'alphafold',
    title: 'AlphaFold 2 and AlphaFold 3',
    question: 'What actually changed between the two.',
    columns: ['AlphaFold 2', 'AlphaFold 3'],
    rows: [
      { label: 'Trunk', cells: ['Evoformer, MSA and pair streams', 'Pairformer, token and pair only'] },
      { label: 'Alignment', cells: ['Carried through the trunk', 'Summarised early, then set aside'] },
      { label: 'Decoder', cells: ['Structure module, residue frames', 'Diffusion over atoms'] },
      { label: 'Output', cells: ['One structure with confidence', 'Sampled structures, then ranked'] },
      { label: 'Covers', cells: ['Proteins, and multimers by extension', 'Proteins, nucleic acids, ligands, ions'] },
      { label: 'Triangle updates', cells: ['Yes', 'Yes'] },
      { label: 'Published as', cells: ['Nature 2021', 'Nature 2024'] },
    ],
    reading:
      'The triangle machinery survived and the alignment stream did not. Read the difference as a move from one deterministic answer about proteins to a sampled answer about biomolecular complexes.',
    sources: [
      { label: 'Jumper et al. 2021, Nature', url: 'https://doi.org/10.1038/s41586-021-03819-2', kind: 'journal' },
      { label: 'Abramson et al. 2024, Nature', url: 'https://doi.org/10.1038/s41586-024-07487-w', kind: 'journal' },
    ],
  },
  {
    slug: 'esmfold-line',
    title: 'ESMFold and ESMFold2',
    question: 'The same idea, rebuilt on a newer encoder and a different decoder.',
    columns: ['ESMFold', 'ESMFold2'],
    rows: [
      { label: 'Encoder', cells: ['ESM-2, frozen', 'ESM C'] },
      { label: 'Alignment', cells: ['None at query time', 'Optional, for difficult targets'] },
      { label: 'Decoder', cells: ['AlphaFold2-style structure module', 'All-atom diffusion'] },
      { label: 'Scope', cells: ['Single chains', 'Chains and complexes'] },
      { label: 'Design use', cells: ['Prediction only', 'Inversion used for binder design'] },
      { label: 'Status', cells: ['Science 2023', 'Preprint 2026, not peer reviewed'] },
    ],
    reading:
      'The lineage is a language model feeding a folding decoder. What changed is that the decoder became generative and the alignment came back as an option rather than a requirement.',
    sources: [
      { label: 'Lin et al. 2023, Science', url: 'https://doi.org/10.1126/science.ade2574', kind: 'journal' },
      { label: 'Candido et al. 2026, preprint', url: 'https://doi.org/10.64898/2026.06.03.729735', kind: 'preprint' },
    ],
  },
];

export const findComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
