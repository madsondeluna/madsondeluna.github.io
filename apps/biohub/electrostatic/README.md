# Electrostatic Surface Calculator

Calculate and visualize electrostatic surface potential of protein structures using PDB2PQR and APBS.

## Features

### **PDB2PQR Integration**
- Submit PDB structures to PDB2PQR web service
- Automatic charge and radius assignment
- Support for multiple force fields:
  - **AMBER** (default, recommended for proteins)
  - **CHARMM** (alternative protein force field)
  - **PARSE** (optimized for APBS)
  - **TYL06** (nucleic acids)
  - **PEOEPB** (peptides)
  - **SWANSON** (custom)

### **APBS Calculation**
- Adaptive Poisson-Boltzmann solver for electrostatic potential
- Customizable parameters:
  - **pH** (0-14, default: 7.0)
  - **Ion Concentration** (0-1 M, default: 0.15 M)
  - Protein dielectric: 2.0
  - Solvent dielectric: 78.0
  - Solvent radius: 1.4 Å

### **3D Visualization**
- Interactive NGL viewer with electrostatic coloring
- Color scale: **Red** (negative) → **White** (neutral) → **Blue** (positive)
- Representations: Cartoon + Surface
- Controls: Spin toggle, center view, surface toggle

### **Results & Export**
- Charge distribution summary
- Top 10 most charged residues
- Download PQR file (with charges and radii)
- Download DX file (potential grid for external visualization)

## How It Works

### **Workflow:**
1. **Upload PDB** → User provides protein structure
2. **Submit to PDB2PQR** → Server assigns charges based on force field
3. **Run APBS** → Calculate electrostatic potential using Poisson-Boltzmann equation
4. **Parse Results** → Extract PQR (charges) and DX (potential grid)
5. **Visualize 3D** → Map charges to colors in NGL viewer

### **Color Mapping:**
- Charge normalized to -5 to +5 kT/e scale
- **Red regions**: Negative potential (acidic, electron-rich)
- **Blue regions**: Positive potential (basic, electron-poor)
- **White regions**: Neutral

## Important Notes

### **CORS Limitations**
The PDB2PQR server at `https://server.poissonboltzmann.org` may have **CORS restrictions** that prevent direct API calls from browsers. This is a common limitation with external APIs.

**Solutions:**
1. **CORS Proxy** (enabled in code):
   - Uncomment the proxy lines in `electrostatic.js`
   - Use services like `corsproxy.io` or `cors-anywhere.herokuapp.com`
   
2. **Fallback Mode**:
   - If PDB2PQR fails, app uses **simplified charge assignment**
   - Based on residue type (ARG/LYS = +, ASP/GLU = -)
   - Less accurate but provides visualization

3. **Local APBS** (advanced):
   - Install APBS locally
   - Create backend server (Node.js/Python)
   - Full control, no CORS issues

### **Server Availability**
- PDB2PQR is a **free public service** - may have downtime or rate limits
- Large structures may take 30-60 seconds to process
- Timeout set to 120 seconds (60 polling attempts × 2s)

## Use Cases

- **Drug Design**: Identify binding sites based on electrostatic complementarity
- **Protein-Protein Interactions**: Analyze charge-charge interactions at interfaces
- **pH Stability**: Study protonation states at different pH values
- **Enzyme Mechanisms**: Visualize active site electrostatics
- **Educational**: Teach electrostatics in structural biology

## Technologies

- **PDB2PQR**: Charge/radius assignment (https://pdb2pqr.readthedocs.io/)
- **APBS**: Poisson-Boltzmann electrostatics solver
- **NGL Viewer**: 3D molecular visualization
- **Vanilla JavaScript**: No dependencies
- **HTML5/CSS3**: Modern web standards

## 🔗 API Endpoints

```javascript
// PDB2PQR REST API v2
POST https://server.poissonboltzmann.org/api/v2/submit
GET  https://server.poissonboltzmann.org/api/v2/status/{jobId}
GET  https://server.poissonboltzmann.org/api/v2/download/{jobId}/output.pqr
GET  https://server.poissonboltzmann.org/api/v2/download/{jobId}/output.dx
```

## References

- Baker NA, Sept D, Joseph S, Holst MJ, McCammon JA. (2001) "Electrostatics of nanosystems: application to microtubules and the ribosome." *PNAS* 98(18):10037-10041.
- Dolinsky TJ, Nielsen JE, McCammon JA, Baker NA. (2004) "PDB2PQR: an automated pipeline for the setup of Poisson-Boltzmann electrostatics calculations." *NAR* 32:W665-W667.

## Future Enhancements

- [ ] Support for custom force field parameters
- [ ] pH titration curves
- [ ] Electrostatic similarity comparison
- [ ] Export to PyMOL/Chimera session files
- [ ] Integration with docking calculations
- [ ] Local APBS backend option

## Troubleshooting

**Problem**: "CORS error" or "Failed to fetch"
- **Solution**: Uncomment CORS proxy in code or use fallback mode

**Problem**: "Job timeout"
- **Solution**: Structure too large. Try smaller PDB or increase `maxAttempts`

**Problem**: No DX file available
- **Solution**: APBS calculation failed. PQR file still available for charges

**Problem**: Colors look wrong
- **Solution**: Check force field selection. AMBER works best for standard proteins
