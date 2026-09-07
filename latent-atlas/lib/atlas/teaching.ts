// A camada didatica: uma analogia por modelo, um exemplo minimo que roda, e
// roteiros que dizem em que ordem ler. O codigo aqui nao foi executado neste
// ambiente; cada trecho declara o que precisa para rodar.

export type Example = {
  title: string;
  language: 'python' | 'bash';
  needs: string;
  weight: string;
  code: string;
  reads: string;
};

export type Teaching = {
  plain: string;
  analogy: string;
  misread: string;
  example?: Example;
};

export const teaching: Record<string, Teaching> = {
  alphafold2: {
    plain:
      'You give it one protein sequence. It finds thousands of related sequences from other species, notices which positions change together across them, and turns that into a three-dimensional model of the protein.',
    analogy:
      'Imagine reading the same sentence translated into a thousand languages. Two words that always change together are probably linked in meaning. Two residues that always mutate together are probably touching in space.',
    misread:
      'A high confidence score is not proof that the structure is right, and a low one often means the region has no fixed shape rather than that the model failed.',
    example: {
      title: 'Fold a sequence without installing anything',
      language: 'bash',
      needs: 'A browser and a Google account for the free notebook',
      weight: 'Minutes for a small protein, on a free GPU',
      reads:
        'ColabFold is the route almost everyone actually uses. It swaps the slow database search for a hosted one, which is why it finishes in minutes instead of hours.',
      code: `# Open the notebook, paste a sequence, run every cell.
# https://colab.research.google.com/github/sokrypton/ColabFold/blob/main/AlphaFold2.ipynb

# Locally, the same idea with the command line client:
pip install "colabfold[alphafold]"
colabfold_batch my_sequence.fasta out_dir/`,
    },
  },
  alphafold3: {
    plain:
      'The same job as AlphaFold 2, extended to everything that sits next to a protein: DNA, RNA, a drug molecule, a metal ion. It writes the whole assembly at once instead of predicting the protein and docking the rest afterwards.',
    analogy:
      'AlphaFold 2 drew the building. AlphaFold 3 draws the building with the furniture already in it, and it sketches the same room several times so you can see which arrangement it keeps returning to.',
    misread:
      'Because the decoder generates rather than measures, it can draw a tidy pose for a ligand that does not really bind. The confidence ranking exists for that reason and should be read, not skipped.',
    example: {
      title: 'Run an open reimplementation',
      language: 'bash',
      needs: 'A GPU with 24 GB or more, and a few hours for the databases',
      weight: 'Heavy. This is the one entry here that a laptop will not carry.',
      reads:
        'The original weights are not freely redistributable, so open work happens in reimplementations. Protenix and Boltz both follow the same architecture family.',
      code: `git clone https://github.com/bytedance/Protenix
cd Protenix && pip install -e .

# One YAML per job: chains, ligands, and what to sample.
protenix predict --input examples/example.json --out_dir ./output --seeds 101`,
    },
  },
  esm2: {
    plain:
      'A model that was trained by hiding amino acids and guessing them back. Doing that well forces it to learn what each position in a protein is for, and those internal numbers turn out to be useful for almost any protein task.',
    analogy:
      'Fill in the blanks, ten billion times, until you cannot help but understand the grammar. Nobody taught it chemistry. It learned which residues belong together by being asked to guess them.',
    misread:
      'It does not predict structure. It produces vectors. ESMFold is the model that turns those vectors into coordinates, and it is a separate download.',
    example: {
      title: 'Get an embedding for one sequence',
      language: 'python',
      needs: 'pip install torch transformers',
      weight: 'About 2.5 GB for the 650M checkpoint. Runs on a CPU in seconds.',
      reads:
        'The last hidden state has one vector per residue. Averaging over the real residues, and not over the padding, gives the sequence vector people feed to a classifier.',
      code: `import torch
from transformers import AutoTokenizer, AutoModel

name = "facebook/esm2_t33_650M_UR50D"
tok = AutoTokenizer.from_pretrained(name)
model = AutoModel.from_pretrained(name).eval()

seq = "MALWMRLLPLLALLALWGPDPAAA"
batch = tok(seq, return_tensors="pt")
with torch.no_grad():
    out = model(**batch).last_hidden_state

# drop the start and end tokens, then average over residues
per_residue = out[0, 1:-1]
sequence_vector = per_residue.mean(0)
print(per_residue.shape, sequence_vector.shape)`,
    },
  },
  esmfold: {
    plain:
      'It folds a protein from the sequence alone. No search for relatives, no waiting on a database. The language model already read enough proteins that its internal state stands in for the alignment.',
    analogy:
      'A translator who has read the whole library does not stop to look words up. Faster, and slightly worse on the rare sentence where looking it up would have helped.',
    misread:
      'Faster does not mean better. When a deep alignment exists, an alignment-based predictor usually wins, and giving up that evidence is a trade you are choosing to make.',
    example: {
      title: 'Predict a structure and write a PDB file',
      language: 'python',
      needs: 'pip install torch transformers accelerate',
      weight: 'Roughly 10 GB of weights. A GPU is strongly preferred.',
      reads:
        'The output is a PDB string you can save and open in any viewer. The B-factor column holds pLDDT, so colouring by B-factor colours by confidence.',
      code: `import torch
from transformers import AutoTokenizer, EsmForProteinFolding

tok = AutoTokenizer.from_pretrained("facebook/esmfold_v1")
model = EsmForProteinFolding.from_pretrained("facebook/esmfold_v1").eval()

seq = "MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKT"
inputs = tok([seq], return_tensors="pt", add_special_tokens=False)
with torch.no_grad():
    output = model(**inputs)

pdb = model.output_to_pdb(output)[0]
open("prediction.pdb", "w").write(pdb)`,
    },
  },
  esm3: {
    plain:
      'One model that reads and writes three things at once: the sequence, the shape, and what the protein does. You hand it a partly filled form and it completes the parts you left blank.',
    analogy:
      'A crossword where the across clues are amino acids, the down clues are geometry, and the theme is the function. Fill in any of them and the rest gets easier.',
    misread:
      'The headline results come from the largest model. The openly available checkpoint is the small one, and it will not reproduce them.',
    example: {
      title: 'Complete a partly masked protein',
      language: 'python',
      needs: 'pip install esm, plus accepting the licence on the model page',
      weight: 'A few gigabytes for the open 1.4B checkpoint.',
      reads:
        'Underscores are the positions you are leaving to the model. The same call can start from a structure track instead, which is what makes this one model rather than three.',
      code: `from esm.models.esm3 import ESM3
from esm.sdk.api import ESMProtein, GenerationConfig

model = ESM3.from_pretrained("esm3_sm_open_v1")

# underscores are the positions you want the model to decide
prompt = ESMProtein(sequence="MKTAYIAKQRQISFVK___________VLDRHDL")
result = model.generate(
    prompt,
    GenerationConfig(track="sequence", num_steps=8, temperature=0.7),
)
print(result.sequence)`,
    },
  },
  proteinmpnn: {
    plain:
      'You give it a shape with no sequence and it tells you which amino acids would hold that shape. This is the step every design pipeline needs, because generated backbones arrive with no sequence at all.',
    analogy:
      'You have the skeleton of a bridge and need to decide which material goes in each beam. The model looks at what surrounds each position and picks something that fits.',
    misread:
      'It does not check whether the sequence really folds back into that shape. That is why the standard pipeline runs a structure predictor afterwards and throws away the designs that do not return.',
    example: {
      title: 'Design sequences for a backbone',
      language: 'bash',
      needs: 'git clone of the repository, PyTorch, and a PDB file',
      weight: 'Around 2M parameters. It runs comfortably on a CPU.',
      reads:
        'Lower sampling temperature gives conservative, repetitive sequences; higher gives diversity and more failures downstream. 0.1 to 0.3 is the usual range.',
      code: `git clone https://github.com/dauparas/ProteinMPNN
cd ProteinMPNN

python protein_mpnn_run.py \\
  --pdb_path my_backbone.pdb \\
  --out_folder ./designs \\
  --num_seq_per_target 8 \\
  --sampling_temp "0.1"

# fixing a binding site: pass --fixed_positions_jsonl with the residues to keep`,
    },
  },
  rfdiffusion: {
    plain:
      'It starts from random noise and removes the noise step by step until a protein backbone appears. You can pin parts of it: keep this motif, bind that target, obey this symmetry.',
    analogy:
      'The same trick that turns static into a picture, applied to a protein. You hold a few pieces fixed and let the process invent everything around them.',
    misread:
      'What comes out is geometry, not a protein. It has no sequence yet, and the reported success rates already assume heavy filtering before anything is synthesised.',
    example: {
      title: 'Generate a backbone that scaffolds a motif',
      language: 'bash',
      needs: 'The repository, a GPU, and the released weights',
      weight: 'A short design takes minutes on a modern GPU.',
      reads:
        'Read the contig string as a sentence: twenty free residues, then residues 10 to 25 of chain A kept exactly, then fifteen more free residues.',
      code: `python scripts/run_inference.py \\
  inference.output_prefix=out/motif \\
  inference.input_pdb=motif.pdb \\
  'contigmap.contigs=[20-20/A10-25/15-15]' \\
  inference.num_designs=10

# then give the backbones a sequence, then check they fold back:
#   ProteinMPNN  ->  ESMFold  ->  keep what matches`,
    },
  },
  esmc: {
    plain:
      'The newer encoder in the same family as ESM-2, trained longer, on more sequences, with a longer window. You use it for the same thing: turning a sequence into numbers that a smaller model can learn from.',
    analogy:
      'Same job, bigger vocabulary and better memory. It reads twice as far along the chain before it has to stop.',
    misread:
      'It is not a structure predictor and not a generative model. It is the encoder that ESMFold2 reads.',
    example: {
      title: 'Embed a sequence with the 300M checkpoint',
      language: 'python',
      needs: 'pip install esm',
      weight: 'Start at 300M. The 6B checkpoint needs a large GPU.',
      reads:
        'Ask for the hidden states, not the logits. The logits answer a masked-token question you did not ask.',
      code: `from esm.models.esmc import ESMC
from esm.sdk.api import ESMProtein, LogitsConfig

model = ESMC.from_pretrained("esmc_300m")
protein = ESMProtein(sequence="MALWMRLLPLLALLALWGPDPAAA")

encoded = model.encode(protein)
out = model.logits(encoded, LogitsConfig(sequence=True, return_embeddings=True))
print(out.embeddings.shape)`,
    },
  },
  ligandmpnn: {
    plain:
      'Sequence design that can see what the protein is holding. A residue whose job is to grip a zinc ion looks arbitrary to a model that cannot see the zinc.',
    analogy:
      'Designing a hand without knowing what it will hold gets you a hand that grips nothing in particular.',
    misread:
      'It trusts the pose you give it. If the ligand is placed wrong in the input, the sequence will be designed around a mistake without complaining.',
  },
  rfdiffusion2: {
    plain:
      'Enzyme design that starts from the geometry of the chemistry. You describe where the catalytic atoms must sit, and the model finds a protein that puts them there, choosing the residue numbering itself.',
    analogy:
      'Instead of saying "residue 45 must be a histidine", you say "a histidine nitrogen must sit here, at this angle". The model decides where in the chain that lands.',
    misread:
      'Active in a screen of under 96 designs is a strong result for design, and still a long way from an enzyme you would use industrially.',
  },
  prottrans: {
    plain:
      'The first generation of protein language models that worked. Still a fair baseline, and still fast enough to be worth trying before reaching for something larger.',
    analogy:
      'The reliable old lens. Sharper glass exists now, and this one still takes the picture.',
    misread:
      'Load the encoder half of ProtT5 and ignore the decoder. Almost nobody uses the full sequence-to-sequence model.',
  },
  saprot: {
    plain:
      'A language model whose alphabet holds two things per position: which amino acid it is, and roughly what shape the backbone takes there.',
    analogy:
      'Writing each letter with an accent that says how the chain bends at that point.',
    misread:
      'It needs a structure at input time. If that structure is predicted, its errors go straight into the tokens.',
  },
  alphamissense: {
    plain:
      'Given one amino-acid substitution, it estimates how likely that change is to break the protein. It was trained without clinical labels, which is what makes testing it against clinical data meaningful.',
    analogy:
      'A typo checker that knows which letters matter. Changing one in a load-bearing word is not the same as changing one in a filler word.',
    misread:
      'A score is one line of computational evidence inside a variant interpretation framework. It is not a diagnosis and it does not cover insertions or deletions.',
  },
  esmfold2: {
    plain:
      'The current end of the language-model-to-structure line: a large encoder in front, an all-atom generative decoder behind, and the alignment demoted from requirement to option.',
    analogy:
      'The same pipeline as ESMFold, with a better reader at the front and a decoder that sketches rather than measures.',
    misread:
      'It is a preprint. The checkpoint you can download today is a small experimental variant whose own card tells you to use the main model for real work.',
  },
};

export type Route = {
  slug: string;
  title: string;
  who: string;
  time: string;
  steps: { label: string; href: string; why: string }[];
};

export const routes: Route[] = [
  {
    slug: 'newcomer',
    title: 'I have never trained anything',
    who: 'You know some biology. The machine learning words are the unfamiliar part.',
    time: 'About an hour',
    steps: [
      {
        label: 'Train a classifier on 100 points',
        href: '/exhibits/classical',
        why: 'Before any protein appears, watch a model learn a boundary from examples. Everything after this is the same loop with more parameters.',
      },
      {
        label: 'Look inside one neuron',
        href: '/exhibits/neuron',
        why: 'Weights, bias, activation. Three ideas that reappear in every architecture in the catalogue.',
      },
      {
        label: 'Fill in a masked word',
        href: '/exhibits/language',
        why: 'This is the exact objective that produced ESM-2. Run it on words first, where you can judge the answer yourself.',
      },
      {
        label: 'Read ESM-2',
        href: '/models/esm2',
        why: 'Now the same objective on amino acids, at a scale where the internal states start to encode structure.',
      },
      {
        label: 'Follow it to a structure',
        href: '/models/esmfold',
        why: 'What has to be added to a language model before coordinates come out the other end.',
      },
    ],
  },
  {
    slug: 'predict',
    title: 'I want to predict a structure',
    who: 'You have a sequence and you need a model of it, plus a way to judge what you get.',
    time: 'An afternoon',
    steps: [
      {
        label: 'Start with AlphaFold 2',
        href: '/models/alphafold2',
        why: 'The alignment-based route, still the reference for a single chain with known relatives.',
      },
      {
        label: 'See what AlphaFold 3 changed',
        href: '/compare',
        why: 'If your question involves a ligand, a nucleic acid or a complex, the answer is a different model.',
      },
      {
        label: 'Use ESMFold when speed wins',
        href: '/models/esmfold',
        why: 'No alignment search. Worth it for orphan sequences and for anything you need thousands of.',
      },
      {
        label: 'Check where the line is now',
        href: '/models/esmfold2',
        why: 'The 2026 preprint, with the caveats that come with reading a preprint.',
      },
    ],
  },
  {
    slug: 'design',
    title: 'I want to design a protein',
    who: 'You want to build something that does not exist yet, and you want to know which model does which step.',
    time: 'An afternoon, then a lot of compute',
    steps: [
      {
        label: 'Generate a backbone',
        href: '/models/rfdiffusion',
        why: 'Diffusion produces the shape. Constraints are how you say what the shape is for.',
      },
      {
        label: 'Give it a sequence',
        href: '/models/proteinmpnn',
        why: 'A backbone with no sequence cannot be ordered. Inverse folding fills that in.',
      },
      {
        label: 'Add the ligand to the picture',
        href: '/models/ligandmpnn',
        why: 'If your design holds a small molecule, a metal or DNA, the protein-only model is blind to half the problem.',
      },
      {
        label: 'Check before you order',
        href: '/models/esmfold',
        why: 'Fold the designed sequence and see whether it returns to the shape you asked for. Most designs do not.',
      },
      {
        label: 'Or prompt one model instead',
        href: '/models/esm3',
        why: 'The multimodal route: describe the motif and the function, let one model write the rest.',
      },
    ],
  },
];

export const findRoute = (slug: string) => routes.find((r) => r.slug === slug);
