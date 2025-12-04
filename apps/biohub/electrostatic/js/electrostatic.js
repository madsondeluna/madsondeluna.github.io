// ==========================================================================
// Electrostatic Surface Calculator using PDB2PQR/APBS
// ==========================================================================

// ==========================================================================
// 1. Typing Animation and NGL Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const textToType = "Calculate electrostatic surface potential using PDB2PQR and APBS...";
    const typingSpeed = 75;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    if (typingElement) type();
    
    // Initialize NGL viewer
    initializeViewer();
});

// ==========================================================================
// 2. DOM Elements
// ==========================================================================
const pdbUpload = document.getElementById('pdb-upload');
const pdbInput = document.getElementById('pdb-input');
const forcefieldSelect = document.getElementById('forcefield');
const phInput = document.getElementById('ph');
const ionConcInput = document.getElementById('ion-conc');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const statusContainer = document.getElementById('status-container');
const viewerContainer = document.getElementById('viewer-container');
const resultsContainer = document.getElementById('results-container');
const resultsOutput = document.getElementById('results-output');
const downloadPqrBtn = document.getElementById('download-pqr');
const downloadDxBtn = document.getElementById('download-dx');

let stage = null;
let component = null;
let jobId = null;
let pqrData = null;
let dxData = null;

// ==========================================================================
// 3. PDB2PQR API Configuration
// ==========================================================================
// Use CORS proxy to avoid browser CORS restrictions
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const PDB2PQR_BASE = 'https://server.poissonboltzmann.org/api';

// Try multiple API endpoints in order
const API_ENDPOINTS = [
    'https://server.poissonboltzmann.org/api',
    CORS_PROXY + encodeURIComponent('https://server.poissonboltzmann.org/api')
];

let PDB2PQR_API = API_ENDPOINTS[0];

// ==========================================================================
// 4. File Upload Handler
// ==========================================================================
pdbUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            pdbInput.value = event.target.result;
        };
        reader.readAsText(file);
    }
});

// ==========================================================================
// 5. NGL Viewer Initialization
// ==========================================================================
function initializeViewer() {
    const viewport = document.getElementById('viewport');
    if (!viewport || typeof NGL === 'undefined') return;
    
    stage = new NGL.Stage(viewport, {
        backgroundColor: 'black'
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        stage.handleResize();
    });
    
    // Setup controls
    const toggleSpinBtn = document.getElementById('toggle-spin');
    const centerViewBtn = document.getElementById('center-view');
    const toggleSurfaceBtn = document.getElementById('toggle-surface');
    
    if (toggleSpinBtn) {
        toggleSpinBtn.addEventListener('click', () => {
            stage.toggleSpin();
        });
    }
    
    if (centerViewBtn) {
        centerViewBtn.addEventListener('click', () => {
            stage.autoView();
        });
    }
    
    if (toggleSurfaceBtn) {
        let surfaceVisible = true;
        toggleSurfaceBtn.addEventListener('click', () => {
            if (component) {
                component.reprList.forEach(repr => {
                    if (repr.getType() === 'surface') {
                        repr.setVisibility(!surfaceVisible);
                    }
                });
                surfaceVisible = !surfaceVisible;
            }
        });
    }
}

// ==========================================================================
// 6. Update Status
// ==========================================================================
function updateStatus(message, type = 'info') {
    statusContainer.innerHTML = `<p>${message}</p>`;
    statusContainer.className = 'status-box';
    
    if (type === 'loading') {
        statusContainer.classList.add('loading');
        statusContainer.innerHTML = `<p><span class="loading-spinner"></span> ${message}</p>`;
    } else if (type === 'success') {
        statusContainer.classList.add('success');
    } else if (type === 'error') {
        statusContainer.classList.add('error');
    }
}

// ==========================================================================
// 7. Submit PDB to PDB2PQR
// ==========================================================================
async function submitToPDB2PQR(pdbText, forcefield, ph, ionConc) {
    updateStatus('Submitting to PDB2PQR server...', 'loading');
    
    try {
        // Prepare JSON payload for new API
        const payload = {
            pdb: pdbText,
            ff: forcefield.toLowerCase(),
            ph: ph,
            apbs: true,
            pdie: 2.0,
            sdie: 78.0,
            srad: 1.4,
            sdens: 10.0,
            bcfl: 'sdh',
            ion_conc: ionConc,
            ion_charge: 1,
            ion_radius: 2.0
        };
        
        // Submit job using JSON API
        const response = await fetch(`${PDB2PQR_API}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'cors'
        });
        
        if (!response.ok) {
            // Try with form data if JSON fails
            const formData = new FormData();
            const pdbBlob = new Blob([pdbText], { type: 'text/plain' });
            formData.append('pdb', pdbBlob, 'input.pdb');
            formData.append('ff', forcefield.toLowerCase());
            formData.append('ph', ph.toString());
            formData.append('apbs', 'true');
            formData.append('whitespace', 'true');
            formData.append('typemap', 'true');
            formData.append('neutraln', 'true');
            formData.append('neutralc', 'true');
            
            const formResponse = await fetch(`${PDB2PQR_API}/submit`, {
                method: 'POST',
                body: formData,
                mode: 'cors'
            });
            
            if (!formResponse.ok) {
                throw new Error(`Server error: ${formResponse.status}. The PDB2PQR server may be down or blocking CORS requests.`);
            }
            
            const formResult = await formResponse.json();
            jobId = formResult.job_id || formResult.jobid;
        } else {
            const result = await response.json();
            jobId = result.job_id || result.jobid;
        }
        
        if (!jobId) {
            throw new Error('No job ID returned from server');
        }
        
        updateStatus(`Job submitted (ID: ${jobId})! Waiting for results...`, 'loading');
        
        // Poll for results
        await pollJobStatus(jobId);
        
    } catch (error) {
        console.error('PDB2PQR submission error:', error);
        
        // Automatically switch to simplified mode
        updateStatus('⚠️ PDB2PQR/APBS server unavailable (API instability or CORS). Switching to simplified electrostatic model...', 'error');
        
        setTimeout(() => {
            updateStatus('Loading simplified electrostatic analysis...', 'loading');
            const pdbText = pdbInput.value.trim();
            if (pdbText) {
                loadSimpleElectrostatic(pdbText);
            }
        }, 2000);
    }
}

// ==========================================================================
// 8. Poll Job Status
// ==========================================================================
async function pollJobStatus(jobId, maxAttempts = 60) {
    let attempts = 0;
    
    const poll = async () => {
        try {
            const response = await fetch(`${PDB2PQR_API}/status/${jobId}`);
            
            if (!response.ok) {
                throw new Error('Failed to check job status');
            }
            
            const status = await response.json();
            
            if (status.status === 'complete') {
                updateStatus('Calculation complete! Loading results...', 'success');
                await downloadResults(jobId);
                return;
            } else if (status.status === 'error') {
                throw new Error('Job failed on server');
            } else if (status.status === 'running' || status.status === 'pending') {
                attempts++;
                if (attempts >= maxAttempts) {
                    throw new Error('Job timeout - calculation taking too long');
                }
                updateStatus(`Calculating... (${attempts}/${maxAttempts})`, 'loading');
                setTimeout(poll, 2000); // Check every 2 seconds
            }
        } catch (error) {
            console.error('Polling error:', error);
            updateStatus(`⚠️ APBS calculation failed: ${error.message}. Switching to simplified mode...`, 'error');
            
            // Fallback to simplified mode
            setTimeout(() => {
                const pdbText = pdbInput.value.trim();
                if (pdbText) {
                    loadSimpleElectrostatic(pdbText);
                }
            }, 2000);
        }
    };
    
    poll();
}

// ==========================================================================
// 9. Download Results from PDB2PQR
// ==========================================================================
async function downloadResults(jobId) {
    try {
        // Download PQR file (with charges and radii)
        const pqrResponse = await fetch(`${PDB2PQR_API}/download/${jobId}/output.pqr`);
        if (pqrResponse.ok) {
            pqrData = await pqrResponse.text();
        }
        
        // Download DX file (electrostatic potential grid)
        const dxResponse = await fetch(`${PDB2PQR_API}/download/${jobId}/output.dx`);
        if (dxResponse.ok) {
            dxData = await dxResponse.text();
        }
        
        // Display results
        displayResults(pqrData, dxData);
        
    } catch (error) {
        console.error('Download error:', error);
        updateStatus(`Error downloading results: ${error.message}`, 'error');
    }
}

// ==========================================================================
// 10. Display Results
// ==========================================================================
function displayResults(pqrData, dxData) {
    updateStatus('Results ready!', 'success');
    
    // Show containers
    viewerContainer.style.display = 'block';
    resultsContainer.style.display = 'block';
    
    // Parse PQR and extract charges
    const charges = parsePQR(pqrData);
    
    // Display summary
    let summary = '=== Electrostatic Analysis Summary ===\n\n';
    summary += `Total atoms: ${charges.length}\n`;
    summary += `Positive charges: ${charges.filter(c => c.charge > 0).length}\n`;
    summary += `Negative charges: ${charges.filter(c => c.charge < 0).length}\n`;
    summary += `Total charge: ${charges.reduce((sum, c) => sum + c.charge, 0).toFixed(2)} e\n\n`;
    
    // Find most charged residues
    const residueCharges = {};
    charges.forEach(atom => {
        const resKey = `${atom.resName}${atom.resSeq}${atom.chainID}`;
        if (!residueCharges[resKey]) {
            residueCharges[resKey] = { name: atom.resName, seq: atom.resSeq, chain: atom.chainID, charge: 0 };
        }
        residueCharges[resKey].charge += atom.charge;
    });
    
    const sortedResidues = Object.values(residueCharges).sort((a, b) => Math.abs(b.charge) - Math.abs(a.charge));
    
    summary += 'Top 10 Most Charged Residues:\n';
    summary += 'Residue\tChain\tNumber\tCharge (e)\n';
    summary += '─'.repeat(50) + '\n';
    
    sortedResidues.slice(0, 10).forEach(res => {
        summary += `${res.name}\t${res.chain}\t${res.seq}\t${res.charge.toFixed(3)}\n`;
    });
    
    resultsOutput.value = summary;
    
    // Load 3D visualization
    if (pqrData) {
        loadElectrostaticVisualization(pqrData, charges);
    }
}

// ==========================================================================
// 11. Parse PQR File
// ==========================================================================
function parsePQR(pqrText) {
    const charges = [];
    const lines = pqrText.split('\n');
    
    for (const line of lines) {
        if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
            // PQR format: ATOM, serial, name, resName, chainID, resSeq, x, y, z, charge, radius
            const parts = line.split(/\s+/);
            
            charges.push({
                serial: parseInt(parts[1]),
                name: parts[2],
                resName: parts[3],
                chainID: parts[4] || 'A',
                resSeq: parseInt(parts[5]),
                x: parseFloat(parts[6]),
                y: parseFloat(parts[7]),
                z: parseFloat(parts[8]),
                charge: parseFloat(parts[9]) || 0,
                radius: parseFloat(parts[10]) || 1.5
            });
        }
    }
    
    return charges;
}

// ==========================================================================
// 12. Load Electrostatic Visualization
// ==========================================================================
function loadElectrostaticVisualization(pqrText, charges) {
    if (!stage) return;
    
    // Remove previous structure
    if (component) {
        stage.removeComponent(component);
    }
    
    // Convert PQR to PDB format for NGL (remove charge/radius columns)
    const pdbText = pqrText.split('\n').map(line => {
        if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
            // Keep only PDB columns (first 54 chars typically)
            return line.substring(0, 66);
        }
        return line;
    }).join('\n');
    
    // Load structure
    const blob = new Blob([pdbText], { type: 'text/plain' });
    stage.loadFile(blob, { ext: 'pdb' }).then((comp) => {
        component = comp;
        
        // Register custom electrostatic color scheme
        NGL.ColormakerRegistry.addScheme((params) => {
            return {
                atomColor: (atom) => {
                    const atomIndex = atom.index;
                    if (atomIndex < charges.length) {
                        const charge = charges[atomIndex].charge;
                        
                        // Normalize charge to color scale (-5 to +5 kT/e)
                        const normalized = Math.max(-1, Math.min(1, charge / 5.0));
                        
                        let r, g, b;
                        if (normalized < 0) {
                            // Negative: White to Red
                            const t = Math.abs(normalized);
                            r = 255;
                            g = Math.floor(255 * (1 - t));
                            b = Math.floor(255 * (1 - t));
                        } else {
                            // Positive: White to Blue
                            const t = normalized;
                            r = Math.floor(255 * (1 - t));
                            g = Math.floor(255 * (1 - t));
                            b = 255;
                        }
                        
                        return (r << 16) | (g << 8) | b;
                    }
                    return 0xFFFFFF; // White for unmapped atoms
                }
            };
        }, 'electrostatic');
        
        // Add representations
        component.addRepresentation('cartoon', { 
            color: 'electrostatic',
            opacity: 0.8
        });
        component.addRepresentation('surface', { 
            color: 'electrostatic',
            opacity: 0.7,
            surfaceType: 'av'
        });
        
        component.autoView();
    }).catch((error) => {
        console.error('Error loading structure:', error);
    });
}

// ==========================================================================
// 13. Fallback: Simple Electrostatic Calculation
// ==========================================================================
function loadSimpleElectrostatic(pdbText) {
    // Simple charge assignment based on residue type
    const RESIDUE_CHARGES = {
        'ARG': 1.0, 'LYS': 1.0, 'HIS': 0.5,  // Positive
        'ASP': -1.0, 'GLU': -1.0,             // Negative
        'SER': 0.0, 'THR': 0.0, 'ASN': 0.0, 'GLN': 0.0,
        'ALA': 0.0, 'VAL': 0.0, 'LEU': 0.0, 'ILE': 0.0,
        'MET': 0.0, 'PHE': 0.0, 'TRP': 0.0, 'TYR': 0.0,
        'PRO': 0.0, 'GLY': 0.0, 'CYS': 0.0
    };
    
    const lines = pdbText.split('\n');
    const charges = [];
    
    for (const line of lines) {
        if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
            const resName = line.substring(17, 20).trim();
            const charge = RESIDUE_CHARGES[resName] || 0;
            
            charges.push({
                serial: parseInt(line.substring(6, 11)),
                name: line.substring(12, 16).trim(),
                resName: resName,
                chainID: line.substring(21, 22),
                resSeq: parseInt(line.substring(22, 26)),
                x: parseFloat(line.substring(30, 38)),
                y: parseFloat(line.substring(38, 46)),
                z: parseFloat(line.substring(46, 54)),
                charge: charge / 10, // Distribute over atoms
                radius: 1.5
            });
        }
    }
    
    // Create pseudo-PQR
    const pqrLines = pdbText.split('\n').map((line, index) => {
        if ((line.startsWith('ATOM') || line.startsWith('HETATM')) && index < charges.length) {
            return line + ` ${charges[index].charge.toFixed(3)} ${charges[index].radius.toFixed(3)}`;
        }
        return line;
    }).join('\n');
    
    displayResults(pqrLines, null);
    updateStatus(`
        <strong>Simplified Electrostatic Analysis Complete!</strong><br>
        <span style="font-size: 0.9rem; color: #ffc107;">
            Using residue-based charge model (ARG/LYS: positive, ASP/GLU: negative).<br>
            This is a <em>simplified fallback</em> due to APBS server unavailability.<br>
            For accurate Poisson-Boltzmann calculations, install local APBS or wait for API stability.
        </span>
    `, 'success');
}

// ==========================================================================
// 14. Calculate Button
// ==========================================================================
calculateBtn.addEventListener('click', async () => {
    const pdbText = pdbInput.value.trim();
    
    if (!pdbText) {
        updateStatus('Please provide PDB input first.', 'error');
        return;
    }
    
    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';
    
    const forcefield = forcefieldSelect.value;
    const ph = parseFloat(phInput.value);
    const ionConc = parseFloat(ionConcInput.value);
    
    try {
        await submitToPDB2PQR(pdbText, forcefield, ph, ionConc);
    } catch (error) {
        updateStatus(`Error: ${error.message}`, 'error');
    } finally {
        calculateBtn.disabled = false;
        calculateBtn.textContent = 'Calculate Electrostatic Surface';
    }
});

// ==========================================================================
// 15. Simple Mode Button (Direct Fallback)
// ==========================================================================
const simpleModeBtn = document.getElementById('simple-mode-btn');
simpleModeBtn.addEventListener('click', () => {
    const pdbText = pdbInput.value.trim();
    
    if (!pdbText) {
        updateStatus('Please provide PDB input first.', 'error');
        return;
    }
    
    simpleModeBtn.disabled = true;
    simpleModeBtn.textContent = 'Loading...';
    
    updateStatus('Starting simplified electrostatic analysis...', 'loading');
    
    setTimeout(() => {
        loadSimpleElectrostatic(pdbText);
        simpleModeBtn.disabled = false;
        simpleModeBtn.textContent = 'Use Simplified Mode';
    }, 500);
});

// ==========================================================================
// 16. Clear Button
// ==========================================================================
clearBtn.addEventListener('click', () => {
    pdbInput.value = '';
    resultsOutput.value = '';
    pdbUpload.value = '';
    jobId = null;
    pqrData = null;
    dxData = null;
    
    updateStatus('Upload a PDB file and click "Calculate" to start', 'info');
    viewerContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    
    if (component && stage) {
        stage.removeComponent(component);
        component = null;
    }
});

// ==========================================================================
// 16. Download Buttons
// ==========================================================================
downloadPqrBtn.addEventListener('click', () => {
    if (!pqrData) {
        alert('No PQR data available');
        return;
    }
    
    const blob = new Blob([pqrData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.pqr';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

downloadDxBtn.addEventListener('click', () => {
    if (!dxData) {
        alert('No DX data available. This requires successful APBS calculation.');
        return;
    }
    
    const blob = new Blob([dxData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'potential.dx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
