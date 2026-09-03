// ==========================================================================
// SASA Calculator - VERSÃO SIMPLIFICADA E FUNCIONAL
// ==========================================================================

let viewer = null;
let atoms = [];
let residues = [];

// DOM Elements
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

// ==========================================================================
// 1. Inicialização
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Calculate Solvent Accessible Surface Area from PDB structures...";
        let charIndex = 0;
        const type = () => {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 75);
            }
        };
        type();
    }
    
    // Inicializar viewer
    console.log('Inicializando SASA Calculator...');
    viewer = new MolecularViewer('viewport');
    console.log('Viewer inicializado');
});

// ==========================================================================
// 2. Upload de PDB
// ==========================================================================
if (pdbUpload) {
    pdbUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                pdbInput.value = event.target.result;
                console.log('PDB carregado do arquivo');
            };
            reader.readAsText(file);
        }
    });
}

// ==========================================================================
// 3. Van der Waals Radii
// ==========================================================================
const VDW_RADII = {
    'H': 1.20, 'C': 1.70, 'N': 1.55, 'O': 1.52,
    'S': 1.80, 'P': 1.80, 'F': 1.47, 'CL': 1.75,
    'BR': 1.85, 'I': 1.98, 'B': 1.92, 'SI': 2.10
};

// ==========================================================================
// 4. Parse PDB
// ==========================================================================
function parsePDB(pdbText) {
    atoms = [];
    residues = [];
    
    const lines = pdbText.split('\n');
    const residueMap = {};
    
    for (const line of lines) {
        if (!line.startsWith('ATOM') && !line.startsWith('HETATM')) continue;
        
        const atom = {
            serial: parseInt(line.substring(6, 11)),
            name: line.substring(12, 16).trim(),
            resName: line.substring(17, 20).trim(),
            chainID: line.substring(21, 22),
            resSeq: parseInt(line.substring(22, 26)),
            x: parseFloat(line.substring(30, 38)),
            y: parseFloat(line.substring(38, 46)),
            z: parseFloat(line.substring(46, 54)),
            element: line.substring(76, 78).trim() || atom.name.substring(0, 1)
        };
        
        atom.radius = VDW_RADII[atom.element] || 1.70;
        atom.sasa = 0;
        
        atoms.push(atom);
        
        const resKey = `${atom.chainID}-${atom.resSeq}`;
        if (!residueMap[resKey]) {
            residueMap[resKey] = {
                chainID: atom.chainID,
                resName: atom.resName,
                resSeq: atom.resSeq,
                atoms: [],
                sasa: 0
            };
            residues.push(residueMap[resKey]);
        }
        residueMap[resKey].atoms.push(atom);
    }
    
    console.log('PDB parseado:', {
        atoms: atoms.length,
        residues: residues.length
    });
    
    return atoms.length > 0;
}

// ==========================================================================
// 5. Gerar Fibonacci Sphere
// ==========================================================================
function generateFibonacciSphere(n) {
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const angle = goldenAngle * i;
        
        points.push({
            x: Math.cos(angle) * radiusAtY,
            y: y,
            z: Math.sin(angle) * radiusAtY
        });
    }
    
    return points;
}

// ==========================================================================
// 6. Calcular SASA
// ==========================================================================
function calculateSASA(probeRadius, nPoints) {
    const spherePoints = generateFibonacciSphere(nPoints);
    
    for (const atom of atoms) {
        let accessiblePoints = 0;
        const testRadius = atom.radius + probeRadius;
        
        for (const point of spherePoints) {
            const testPoint = {
                x: atom.x + point.x * testRadius,
                y: atom.y + point.y * testRadius,
                z: atom.z + point.z * testRadius
            };
            
            let isAccessible = true;
            for (const other of atoms) {
                if (other === atom) continue;
                
                const dx = testPoint.x - other.x;
                const dy = testPoint.y - other.y;
                const dz = testPoint.z - other.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                if (dist < other.radius + probeRadius) {
                    isAccessible = false;
                    break;
                }
            }
            
            if (isAccessible) accessiblePoints++;
        }
        
        const sphereArea = 4 * Math.PI * testRadius * testRadius;
        atom.sasa = (accessiblePoints / nPoints) * sphereArea;
    }
    
    // Agregar SASA por resíduo
    for (const residue of residues) {
        residue.sasa = residue.atoms.reduce((sum, atom) => sum + atom.sasa, 0);
    }
    
    console.log('SASA calculado');
}

// ==========================================================================
// 7. Exibir Resultados
// ==========================================================================
function displayResults() {
    const totalSASA = atoms.reduce((sum, atom) => sum + atom.sasa, 0);
    
    // Total SASA
    totalSasaDiv.innerHTML = `
        <h3>Total SASA</h3>
        <p class="value">${totalSASA.toFixed(2)} <span class="unit">Å²</span></p>
    `;
    
    // Resultados texto
    let resultsText = 'Residue-level SASA:\n';
    resultsText += 'Chain\tResidue\tNumber\tSASA (Å²)\n';
    resultsText += '─'.repeat(50) + '\n';
    
    for (const residue of residues) {
        resultsText += `${residue.chainID}\t${residue.resName}\t${residue.resSeq}\t${residue.sasa.toFixed(2)}\n`;
    }
    
    resultsText += '─'.repeat(50) + '\n';
    resultsText += `Total: ${totalSASA.toFixed(2)} Å²\n`;
    resultsText += `Atoms: ${atoms.length}\n`;
    resultsText += `Residues: ${residues.length}\n`;
    
    resultsOutput.value = resultsText;
    
    // Gráfico
    displayChart();
}

// ==========================================================================
// 8. Gráfico Simples
// ==========================================================================
function displayChart() {
    if (residues.length === 0) return;
    
    const topResidues = [...residues]
        .sort((a, b) => b.sasa - a.sasa)
        .slice(0, 10);
    
    const maxSASA = Math.max(...topResidues.map(r => r.sasa));
    
    // A cor e o espaco saem de tool.css: nenhum literal aqui. A barra
    // cresce por transform, nao por width.
    let html = '<h3>Top ten residues by SASA</h3>';
    html += '<div class="bars">';

    for (const res of topResidues) {
        const fraction = res.sasa / maxSASA;
        html += `
            <div class="bar-row">
                <div class="bar-head">
                    <span>${res.resName}-${res.resSeq}</span>
                    <span class="num">${res.sasa.toFixed(1)}</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="transform: scaleX(${fraction})"></div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    chartContainer.innerHTML = html;
}

// ==========================================================================
// 9. Carregar 3D
// ==========================================================================
function loadVisualization() {
    if (!viewer.isReady) {
        console.warn('Viewer nao esta pronto');
        setTimeout(loadVisualization, 500);
        return;
    }
    
    const pdbText = pdbInput.value.trim();
    if (!pdbText) {
        console.error('PDB vazio');
        return;
    }
    
    console.log('Carregando visualizacao 3D...');
    
    // Mostrar container
    const container = document.getElementById('viewer-container');
    if (container) container.classList.remove('hidden');
    
    // Carregar PDB
    viewer.loadPDB(pdbText)
        .then(() => {
            console.log('PDB carregado no viewer');
            
            // Colorir por SASA se temos dados
            if (atoms.length > 0) {
                const sasaValues = atoms.map(a => a.sasa);
                viewer.colorBySASA(sasaValues);
                console.log('Coloring SASA aplicado');
            }
        })
        .catch((error) => {
            console.error('Erro ao carregar 3D:', error);
        });
}

// ==========================================================================
// 10. Botão Calculate
// ==========================================================================
if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const pdbText = pdbInput.value.trim();
        
        if (!pdbText) {
            alert('Provide a PDB structure first.');
            return;
        }
        
        if (!parsePDB(pdbText)) {
            alert('The PDB content is empty or invalid.');
            return;
        }
        
        const probeRadius = parseFloat(probeRadiusInput.value) || 1.4;
        const nPoints = parseInt(nPointsInput.value) || 100;
        
        console.log('Calculando SASA:', { probeRadius, nPoints });
        calculateSASA(probeRadius, nPoints);
        displayResults();
        loadVisualization();
        
        console.log('Calculo e visualizacao completos');
    });
}

// ==========================================================================
// 11. Botão Clear
// ==========================================================================
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        pdbInput.value = '';
        resultsOutput.value = '';
        totalSasaDiv.innerHTML = '';
        chartContainer.innerHTML = '<p>The chart appears after a calculation.</p>';
        atoms = [];
        residues = [];
        
        const container = document.getElementById('viewer-container');
        if (container) container.classList.add('hidden');
        
        if (viewer && viewer.component && viewer.stage) {
            viewer.stage.removeComponent(viewer.component);
            viewer.component = null;
        }
        
        console.log('Limpo');
    });
}

// ==========================================================================
// 12. Copy Button
// ==========================================================================
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (!resultsOutput.value) {
            alert('Nothing to copy.');
            return;
        }
        
        navigator.clipboard.writeText(resultsOutput.value).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = original; }, 2000);
        });
    });
}

// ==========================================================================
// 13. Download Button
// ==========================================================================
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        if (residues.length === 0) {
            alert('Run the SASA calculation first.');
            return;
        }
        
        let csv = 'Chain,Residue,Number,SASA\n';
        for (const res of residues) {
            csv += `${res.chainID},${res.resName},${res.resSeq},${res.sasa.toFixed(2)}\n`;
        }
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sasa_results.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('CSV baixado');
    });
}

console.log('SASA Calculator carregado');
