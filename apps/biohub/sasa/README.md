# SASA Calculator

Calculate Solvent Accessible Surface Area (SASA) from PDB structures with 3D visualization.

## Features

- **PDB Input**: Upload PDB files or paste PDB text
- **Customizable Parameters**:
  - Probe Radius (0.5 - 3.0 Å, default: 1.4 Å for water)
  - Sampling Points (50 - 500, default: 100)
- **Shrake-Rupley Algorithm**: Uses Fibonacci sphere sampling for even point distribution
- **3D Visualization**: Interactive molecular viewer with SASA-based coloring
- **Color Gradient**: Blue (buried) → Cyan → Green → Yellow → Red (exposed)
- **Results Display**:
  - Total SASA
  - Per-residue breakdown
  - Top 10 residues bar chart
- **Export Options**: Copy to clipboard or download CSV

## Algorithm

The calculator implements the **Shrake-Rupley algorithm**:

1. For each atom, generate evenly distributed points on a sphere at radius = VDW radius + probe radius
2. Test each point for collision with neighboring atoms
3. SASA = (accessible points / total points) × sphere surface area
4. Aggregate atom SASA values per residue

**Fibonacci Sphere**: Uses golden angle (π(3 - √5)) for uniform point distribution

## Van der Waals Radii

Default atomic radii (Å):
- C: 1.70
- N: 1.55
- O: 1.52
- S: 1.80
- H: 1.20
- Default: 1.70

## 3D Visualization

The integrated NGL viewer displays the structure with:
- **Cartoon representation**: Secondary structure overview
- **Surface representation**: Solvent accessibility surface
- **SASA coloring**: Gradient from blue (buried, low SASA) to red (exposed, high SASA)
- **Interactive controls**: Spin toggle, center view

## Usage

1. Upload or paste PDB structure
2. Adjust parameters (optional)
3. Click "Calculate SASA"
4. View results, 3D visualization, and charts
5. Export data as needed

## Technologies

- **NGL Viewer**: 3D molecular visualization
- **Vanilla JavaScript**: No dependencies
- **HTML5/CSS3**: Modern web standards
