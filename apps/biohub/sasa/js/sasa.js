// ==========================================================================
// 1. Typing Animation and NGL Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const textToType = "Calculate Solvent Accessible Surface Area from PDB structures...";
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
const resultsOutput = document.getElementById('results-output');
const totalSasaDiv = document.getElementById('total-sasa');
const chartContainer = document.getElementById('residue-chart');
const probeRadiusInput = document.getElementById('probe-radius');
const nPointsInput = document.getElementById('n-points');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

let atoms = [];
let residues = [];
let sasaResults = null;
let stage = null;
let component = null;

// ==========================================================================
// 3. Van der Waals Radii (Å)
// ==========================================================================
const VDW_RADII = {
    'C': 1.70, 'N': 1.55, 'O': 1.52, 'S': 1.80,
    'H': 1.20, 'P': 1.80, 'F': 1.47, 'CL': 1.75,
    'BR': 1.85, 'I': 1.98, 'FE': 1.40, 'ZN': 1.39,
    'default': 1.70
};

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
// 5. PDB Parser
// ==========================================================================
function parsePDB(pdbText) {
    atoms = [];
    residues = [];
    const lines = pdbText.split('\n');
    
    for (const line of lines) {
        if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
            const atom = {
                serial: parseInt(line.substring(6, 11).trim()),
                name: line.substring(12, 16).trim(),
                resName: line.substring(17, 20).trim(),
                chainID: line.substring(21, 22).trim(),
                resSeq: parseInt(line.substring(22, 26).trim()),
                x: parseFloat(line.substring(30, 38).trim()),
                y: parseFloat(line.substring(38, 46).trim()),
                z: parseFloat(line.substring(46, 54).trim()),
                element: line.substring(76, 78).trim() || line.substring(12, 14).trim().replace(/[0-9]/g, ''),
                sasa: 0
            };
            
            // Get VDW radius
            const element = atom.element.toUpperCase();
            atom.vdw = VDW_RADII[element] || VDW_RADII['default'];
            
            atoms.push(atom);
        }
    }
    
    // Group by residue
    const residueMap = new Map();
    for (const atom of atoms) {
        const resKey = `${atom.chainID}_${atom.resSeq}_${atom.resName}`;
        if (!residueMap.has(resKey)) {
            residueMap.set(resKey, {
                chainID: atom.chainID,
                resSeq: atom.resSeq,
                resName: atom.resName,
                atoms: [],
                sasa: 0
            });
        }
        residueMap.get(resKey).atoms.push(atom);
    }
    
    residues = Array.from(residueMap.values());
    return atoms.length > 0;
}

// ==========================================================================
// 6. SASA Calculation (Shrake-Rupley Algorithm)
// ==========================================================================
function calculateSASA() {
    const pdbText = pdbInput.value.trim();
    if (!pdbText) {
        alert('Please provide PDB input first.');
        return;
    }
    
    if (!parsePDB(pdbText)) {
        alert('No atoms found in PDB file.');
        return;
    }
    
    const probeRadius = parseFloat(probeRadiusInput.value);
    const nPoints = parseInt(nPointsInput.value);
    
    // Generate sphere points (Fibonacci sphere)
    const spherePoints = generateFibonacciSphere(nPoints);
    
    // Calculate SASA for each atom
    for (let i = 0; i < atoms.length; i++) {
        const atom = atoms[i];
        const testRadius = atom.vdw + probeRadius;
        let accessiblePoints = 0;
        
        // Test each sphere point
        for (const point of spherePoints) {
            const testX = atom.x + point.x * testRadius;
            const testY = atom.y + point.y * testRadius;
            const testZ = atom.z + point.z * testRadius;
            
            let isAccessible = true;
            
            // Check collision with other atoms
            for (let j = 0; j < atoms.length; j++) {
                if (i === j) continue;
                
                const other = atoms[j];
                const otherRadius = other.vdw + probeRadius;
                const dx = testX - other.x;
                const dy = testY - other.y;
                const dz = testZ - other.z;
                const distSq = dx*dx + dy*dy + dz*dz;
                
                if (distSq < otherRadius * otherRadius) {
                    isAccessible = false;
                    break;
                }
            }
            
            if (isAccessible) accessiblePoints++;
        }
        
        // SASA = (accessible points / total points) * surface area of sphere
        const surfaceArea = 4 * Math.PI * testRadius * testRadius;
        atom.sasa = (accessiblePoints / nPoints) * surfaceArea;
    }
    
    // Calculate residue SASA
    for (const residue of residues) {
        residue.sasa = residue.atoms.reduce((sum, atom) => sum + atom.sasa, 0);
    }
    
    displayResults();
}

// ==========================================================================
// 7. Generate Fibonacci Sphere Points
// ==========================================================================
function generateFibonacciSphere(n) {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2; // y from 1 to -1
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        points.push({ x, y, z });
    }
    
    return points;
}

// ==========================================================================
// 8. Display Results
// ==========================================================================
function displayResults() {
    const totalSASA = atoms.reduce((sum, atom) => sum + atom.sasa, 0);
    
    // Display total SASA
    totalSasaDiv.innerHTML = `
        <h3>Total SASA</h3>
        <p class="value">${totalSASA.toFixed(2)} <span class="unit">Ų</span></p>
    `;
    
    // Generate detailed results
    let resultsText = 'Residue-level SASA:\n';
    resultsText += 'Chain\tResidue\tNumber\tSASA (Ų)\n';
    resultsText += '─'.repeat(50) + '\n';
    
    for (const residue of residues) {
        resultsText += `${residue.chainID}\t${residue.resName}\t${residue.resSeq}\t${residue.sasa.toFixed(2)}\n`;
    }
    
    resultsText += '─'.repeat(50) + '\n';
    resultsText += `\nTotal: ${totalSASA.toFixed(2)} Ų\n`;
    resultsText += `Atoms analyzed: ${atoms.length}\n`;
    resultsText += `Residues: ${residues.length}\n`;
    
    resultsOutput.value = resultsText;
    
    // Simple bar chart visualization
    displayChart();
    
    // Load 3D structure with SASA coloring
    const pdbText = pdbInput.value.trim();
    if (pdbText && stage) {
        loadStructureWithSASA(pdbText);
    }
    
    sasaResults = {
        total: totalSASA,
        residues: residues.map(r => ({
            chain: r.chainID,
            name: r.resName,
            number: r.resSeq,
            sasa: r.sasa
        }))
    };
}

// ==========================================================================
// 9. Display Simple Chart
// ==========================================================================
function displayChart() {
    // Get top 10 residues by SASA
    const top10 = [...residues]
        .sort((a, b) => b.sasa - a.sasa)
        .slice(0, 10);
    
    const maxSASA = Math.max(...top10.map(r => r.sasa));
    
    let chartHTML = '<div style="width: 100%;">';
    chartHTML += '<h4 style="margin: 0 0 1rem 0; color: var(--color-text-secondary);">Top 10 Residues by SASA</h4>';
    
    for (const residue of top10) {
        const percentage = (residue.sasa / maxSASA) * 100;
        chartHTML += `
            <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.85rem;">
                    <span>${residue.resName}${residue.resSeq} (${residue.chainID})</span>
                    <span>${residue.sasa.toFixed(2)} Ų</span>
                </div>
                <div style="width: 100%; height: 20px; background-color: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #0dcaf0 0%, #0d6efd 100%);"></div>
                </div>
            </div>
        `;
    }
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
}

// ==========================================================================
// 10. Calculate Button
// ==========================================================================
calculateBtn.addEventListener('click', () => {
    calculateBtn.textContent = 'Calculating...';
    calculateBtn.disabled = true;
    
    // Use setTimeout to allow UI update
    setTimeout(() => {
        try {
            calculateSASA();
        } catch (error) {
            alert('Error calculating SASA: ' + error.message);
        } finally {
            calculateBtn.textContent = 'Calculate SASA';
            calculateBtn.disabled = false;
        }
    }, 100);
});

// ==========================================================================
// 11. Clear Button
// ==========================================================================
clearBtn.addEventListener('click', () => {
    pdbInput.value = '';
    resultsOutput.value = '';
    totalSasaDiv.innerHTML = '';
    chartContainer.innerHTML = '<p>Chart will appear after calculation</p>';
    pdbUpload.value = '';
    atoms = [];
    residues = [];
    sasaResults = null;
    
    // Clear 3D viewer
    if (component && stage) {
        stage.removeComponent(component);
        component = null;
    }
    const viewerContainer = document.getElementById('viewer-container');
    if (viewerContainer) {
        viewerContainer.style.display = 'none';
    }
});

// ==========================================================================
// 12. Copy to Clipboard
// ==========================================================================
copyBtn.addEventListener('click', () => {
    const text = resultsOutput.value;
    if (!text) {
        alert('No results to copy. Please calculate SASA first.');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
});

// ==========================================================================
// 13. Download CSV
// ==========================================================================
downloadBtn.addEventListener('click', () => {
    if (!sasaResults) {
        alert('No results to download. Please calculate SASA first.');
        return;
    }

    let csvContent = 'Chain,Residue,Number,SASA_A2\n';
    for (const residue of sasaResults.residues) {
        csvContent += `${residue.chain},${residue.name},${residue.number},${residue.sasa.toFixed(2)}\n`;
    }
    csvContent += `\nTotal SASA,,,${sasaResults.total.toFixed(2)}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sasa_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// ==========================================================================
// 14. NGL Viewer Initialization
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
}

// ==========================================================================
// 15. Load Structure and Apply SASA Coloring
// ==========================================================================
function loadStructureWithSASA(pdbText) {
    if (!stage) return;
    
    const viewerContainer = document.getElementById('viewer-container');
    if (viewerContainer) {
        viewerContainer.style.display = 'block';
    }
    
    // Remove previous structure
    if (component) {
        stage.removeComponent(component);
    }
    
    // Load structure from text
    const blob = new Blob([pdbText], { type: 'text/plain' });
    stage.loadFile(blob, { ext: 'pdb' }).then((comp) => {
        component = comp;
        
        // Register custom SASA color scheme
        NGL.ColormakerRegistry.addScheme((params) => {
            return {
                atomColor: (atom) => {
                    // Find corresponding atom in our atoms array
                    const atomIndex = atom.index;
                    if (atomIndex < atoms.length) {
                        const sasa = atoms[atomIndex].sasa;
                        
                        // Normalize SASA to 0-1 range
                        const maxSASA = Math.max(...atoms.map(a => a.sasa));
                        const normalized = maxSASA > 0 ? sasa / maxSASA : 0;
                        
                        // Color gradient: Blue (buried) -> Cyan -> Green -> Yellow -> Red (exposed)
                        let r, g, b;
                        if (normalized < 0.25) {
                            // Blue to Cyan
                            const t = normalized / 0.25;
                            r = 0;
                            g = Math.floor(t * 255);
                            b = 255;
                        } else if (normalized < 0.5) {
                            // Cyan to Green
                            const t = (normalized - 0.25) / 0.25;
                            r = 0;
                            g = 255;
                            b = Math.floor((1 - t) * 255);
                        } else if (normalized < 0.75) {
                            // Green to Yellow
                            const t = (normalized - 0.5) / 0.25;
                            r = Math.floor(t * 255);
                            g = 255;
                            b = 0;
                        } else {
                            // Yellow to Red
                            const t = (normalized - 0.75) / 0.25;
                            r = 255;
                            g = Math.floor((1 - t) * 255);
                            b = 0;
                        }
                        
                        return (r << 16) | (g << 8) | b;
                    }
                    return 0x808080; // Gray for unmapped atoms
                }
            };
        }, 'sasa');
        
        // Add representations with SASA coloring
        component.addRepresentation('cartoon', { 
            color: 'sasa',
            opacity: 0.8
        });
        component.addRepresentation('surface', { 
            color: 'sasa',
            opacity: 0.6,
            surfaceType: 'av'
        });
        
        // Center and zoom
        component.autoView();
    }).catch((error) => {
        console.error('Error loading structure:', error);
    });
}

