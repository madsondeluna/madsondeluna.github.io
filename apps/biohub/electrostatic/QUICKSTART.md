# Electrostatic Surface Calculator - Quick Start

## Testing the App

### Option 1: Use Sample PDB
You can test with any small protein from the PDB database. Here's a minimal example:

**Peptide (simplified):**
```
ATOM      1  N   GLY A   1      -0.525   1.362   0.000  1.00  0.00           N
ATOM      2  CA  GLY A   1       0.000   0.000   0.000  1.00  0.00           C
ATOM      3  C   GLY A   1       1.525   0.000   0.000  1.00  0.00           C
ATOM      4  O   GLY A   1       2.190   0.000  -1.038  1.00  0.00           O
ATOM      5  N   ARG A   2       2.069   0.000   1.217  1.00  0.00           N
ATOM      6  CA  ARG A   2       3.527   0.000   1.362  1.00  0.00           C
ATOM      7  C   ARG A   2       4.054   0.000   2.800  1.00  0.00           C
ATOM      8  O   ARG A   2       3.290   0.000   3.765  1.00  0.00           O
ATOM      9  CZ  ARG A   2       6.000   0.000   4.000  1.00  0.00           C
ATOM     10  NH1 ARG A   2       7.000   0.000   5.000  1.00  0.00           N
ATOM     11  N   ASP A   3       5.373   0.000   2.899  1.00  0.00           N
ATOM     12  CA  ASP A   3       6.036   0.000   4.200  1.00  0.00           C
ATOM     13  CG  ASP A   3       7.000   0.000   5.000  1.00  0.00           C
ATOM     14  OD1 ASP A   3       7.500   1.000   5.500  1.00  0.00           O
ATOM     15  OD2 ASP A   3       7.500  -1.000   5.500  1.00  0.00           O
END
```

### Option 2: Download from RCSB PDB
1. Go to https://www.rcsb.org
2. Search for a small protein (e.g., "1UBQ" - Ubiquitin)
3. Click "Download Files" → "PDB Format"
4. Upload to the Electrostatic Surface Calculator

## Recommended Test Structures

| PDB ID | Name | Description | Best For |
|--------|------|-------------|----------|
| 1UBQ | Ubiquitin | Small protein (76 residues) | Quick test |
| 1AKI | Ankyrin repeat | Alpha helical structure | Charge distribution |
| 1CRN | Crambin | Tiny protein (46 residues) | Fast calculation |
| 2LYZ | Lysozyme | Enzyme (129 residues) | Active site analysis |
| 1BRS | Barnase | Ribonuclease (110 residues) | Electrostatic features |

## Recommended Parameters

### For Standard Proteins:
- **Force Field**: AMBER
- **pH**: 7.0 (physiological)
- **Ion Concentration**: 0.15 M (physiological saline)

### For Acidic Environment:
- **pH**: 5.0
- Watch charged residues change protonation states

### For Basic Environment:
- **pH**: 9.0
- See how surface charges redistribute

## Interpreting Results

### Color Scale:
- **Intense Red**: Strongly negative (ASP, GLU clusters)
- **Light Red/Pink**: Weakly negative
- **White**: Neutral
- **Light Blue**: Weakly positive
- **Intense Blue**: Strongly positive (ARG, LYS clusters)

### Key Residues to Look For:
- **ARG, LYS, HIS** → Blue (positive)
- **ASP, GLU** → Red (negative)
- **Binding sites** → Often have specific charge patterns
- **Protein-protein interfaces** → Look for charge complementarity

## Troubleshooting

### If CORS error occurs:
1. Check browser console (F12)
2. App will automatically fallback to simplified mode
3. You'll still see visualization, just with estimated charges

### If PDB2PQR times out:
- Structure may be too large (>500 residues)
- Server may be busy - try again later
- Use simplified mode as alternative

### If colors look uniform:
- Structure may be too small
- Try adjusting pH to see changes
- Use a protein with more charged residues (ARG, LYS, ASP, GLU)

## Learning Examples

### Example 1: Enzyme Active Site
1. Load 2LYZ (lysozyme)
2. pH 7.0, AMBER force field
3. Look for blue/red regions near catalytic cleft
4. These indicate electrostatic catalysis

### Example 2: pH Effects
1. Load 1UBQ
2. Calculate at pH 5.0 → Save screenshot
3. Calculate at pH 9.0 → Compare
4. Notice how histidine charges change

### Example 3: Protein Stability
1. Load 1CRN
2. Look for:
   - **Red-Blue patches** = salt bridges (stabilizing)
   - **Red-Red or Blue-Blue** = repulsion (destabilizing)
   - **White regions** = hydrophobic core

## Educational Use

Perfect for teaching:
- **Biochemistry**: Charge distribution and pH effects
- **Structural Biology**: Structure-function relationships
- **Drug Design**: Identifying binding pockets
- **Molecular Dynamics**: Initial setup verification

## Related Tools

After calculating electrostatic surface, try:
- **SASA Calculator**: Compare exposed vs buried charged residues
- **ContactMap**: See which charged residues are close in 3D
- **PDBViewer**: Explore structure with different representations

Enjoy exploring electrostatics!
