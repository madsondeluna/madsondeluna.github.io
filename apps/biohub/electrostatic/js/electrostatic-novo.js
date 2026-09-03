// ==========================================================================
// Electrostatic Surface Calculator - VERSÃO SIMPLIFICADA
// ==========================================================================

let viewer = null;
let chargesData = [];

// DOM Elements
const pdbUpload = document.getElementById('pdb-upload');
const pdbInput = document.getElementById('pdb-input');
const statusContainer = document.getElementById('status-container');
const viewerContainer = document.getElementById('viewer-container');
const resultsContainer = document.getElementById('results-container');
const resultsOutput = document.getElementById('results-output');
const forcefieldSelect = document.getElementById('forcefield');
const phInput = document.getElementById('ph');
const ionConcInput = document.getElementById('ion-conc');
const calculateBtn = document.getElementById('calculate-btn');
const simpleModeBtn = document.getElementById('simple-mode-btn');
const clearBtn = document.getElementById('clear-btn');

// ==========================================================================
// 1. Inicialização
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Calculate electrostatic surface potential using PDB2PQR and APBS...";
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
    console.log('Inicializando Electrostatic Calculator...');
    viewer = new MolecularViewer('viewport');
    console.log('Viewer inicializado');
});

// ==========================================================================
// 2. Upload PDB
// ==========================================================================
if (pdbUpload) {
    pdbUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                pdbInput.value = event.target.result;
                console.log('PDB carregado');
            };
            reader.readAsText(file);
        }
    });
}

// ==========================================================================
// 3. Status Helper
// ==========================================================================
function updateStatus(message, type = 'info') {
    if (!statusContainer) return;
    
    statusContainer.innerHTML = `<p>${message}</p>`;
    statusContainer.className = 'status-box ' + type;
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ==========================================================================
// 4. Cargas de Resíduos (Modo Simplificado)
// ==========================================================================
const RESIDUE_CHARGES = {
    'ARG': 1.0,  'LYS': 1.0,  'HIS': 0.5,
    'ASP': -1.0, 'GLU': -1.0,
    'SER': 0.0,  'THR': 0.0,  'ASN': 0.0,  'GLN': 0.0,
    'ALA': 0.0,  'VAL': 0.0,  'LEU': 0.0,  'ILE': 0.0,
    'MET': 0.0,  'PHE': 0.0,  'TRP': 0.0,  'TYR': 0.0,
    'PRO': 0.0,  'GLY': 0.0,  'CYS': 0.0
};

// ==========================================================================
// 5. Parse PDB e Atribuir Cargas
// ==========================================================================
function parsePDBWithCharges(pdbText) {
    chargesData = [];
    
    const lines = pdbText.split('\n');
    for (const line of lines) {
        if (!line.startsWith('ATOM') && !line.startsWith('HETATM')) continue;
        
        const resName = line.substring(17, 20).trim();
        const charge = RESIDUE_CHARGES[resName] || 0;
        
        chargesData.push({
            serial: parseInt(line.substring(6, 11)),
            name: line.substring(12, 16).trim(),
            resName: resName,
            chainID: line.substring(21, 22),
            resSeq: parseInt(line.substring(22, 26)),
            x: parseFloat(line.substring(30, 38)),
            y: parseFloat(line.substring(38, 46)),
            z: parseFloat(line.substring(46, 54)),
            charge: charge
        });
    }
    
    console.log('Cargas parseadas:', chargesData.length, 'atomos');
    return chargesData.length > 0;
}

// ==========================================================================
// 6. Modo Simplificado (Fallback)
// ==========================================================================
function useSimplifiedMode(pdbText) {
    console.log('Usando modo simplificado (residue-based)...');
    
    if (!parsePDBWithCharges(pdbText)) {
        updateStatus('Could not parse the PDB file.', 'error');
        return;
    }
    
    // Mostrar container
    if (viewerContainer) viewerContainer.classList.remove('hidden');
    if (resultsContainer) resultsContainer.classList.add('hidden');
    
    updateStatus('Loading the structure in simplified mode.', 'loading');
    
    // Carregar no viewer
    viewer.loadPDB(pdbText)
        .then(() => {
            console.log('Estrutura carregada');
            
            // Colorir por carga
            const charges = chargesData.map(a => a.charge);
            colorByCharge(charges);
            
            updateStatus(`
                <strong>Simplified mode</strong><br>
                <span style="font-size: 0.9rem;">
                Usando modelo residue-based: ARG/LYS=positivo, ASP/GLU=negativo<br>
                This is an approximation. For a real Poisson-Boltzmann calculation, install APBS locally.
                </span>
            `, 'success');
        })
        .catch((error) => {
            console.error('Erro:', error);
            updateStatus('Could not load the structure: ' + error.message, 'error');
        });
}

// ==========================================================================
// 7. Colorir por Carga
// ==========================================================================
function colorByCharge(charges) {
    if (!viewer.component || !charges || charges.length === 0) {
        console.warn('Dados insuficientes para coloring');
        return;
    }
    
    try {
        console.log('Colorindo por carga...');
        
        viewer.component.removeAllRepresentations();
        
        const schemeName = 'charge-' + Date.now();
        NGL.ColormakerRegistry.addScheme((params) => {
            return {
                atomColor: (atom) => {
                    const idx = atom.index;
                    if (idx < charges.length) {
                        const charge = charges[idx];
                        
                        // Vermelho (negativo) → Branco (neutro) → Azul (positivo)
                        if (charge < -0.5) {
                            return 0xFF0000; // Vermelho
                        } else if (charge < -0.1) {
                            return 0xFF8888; // Vermelho claro
                        } else if (charge < 0.1) {
                            return 0xFFFFFF; // Branco
                        } else if (charge < 0.5) {
                            return 0x8888FF; // Azul claro
                        } else {
                            return 0x0000FF; // Azul
                        }
                    }
                    return 0xFFFFFF; // Branco
                }
            };
        }, schemeName);
        
        // Cartoon com cores de carga
        viewer.component.addRepresentation('cartoon', {
            color: schemeName,
            opacity: 0.9
        });
        
        // Surface
        if (viewer.component.structure.atomCount > 50) {
            viewer.component.addRepresentation('surface', {
                color: schemeName,
                opacity: 0.4,
                surfaceType: 'av'
            });
        }
        
        console.log('Coloring aplicado');
        
    } catch (error) {
        console.error('Erro em coloring:', error);
        viewer.component.addRepresentation('cartoon', { color: 'chainindex' });
    }
}

// ==========================================================================
// 8. Botão Calculate (Modo Simplificado)
// ==========================================================================
if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const pdbText = pdbInput.value.trim();
        
        if (!pdbText) {
            updateStatus('Provide a PDB structure first.', 'error');
            return;
        }
        
        updateStatus('Processing.', 'loading');
        
        // Usar sempre modo simplificado agora
        setTimeout(() => {
            useSimplifiedMode(pdbText);
        }, 500);
    });
}

// ==========================================================================
// 9. Botão Modo Simplificado
// ==========================================================================
if (simpleModeBtn) {
    simpleModeBtn.addEventListener('click', () => {
        const pdbText = pdbInput.value.trim();
        
        if (!pdbText) {
            updateStatus('Provide a PDB structure first.', 'error');
            return;
        }
        
        updateStatus('Starting simplified mode.', 'loading');
        
        setTimeout(() => {
            useSimplifiedMode(pdbText);
        }, 500);
    });
}

// ==========================================================================
// 10. Botão Clear
// ==========================================================================
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        pdbInput.value = '';
        if (resultsOutput) resultsOutput.value = '';
        pdbUpload.value = '';
        chargesData = [];
        
        updateStatus('Upload a PDB file and click "Calculate" to start', 'info');
        
        if (viewerContainer) viewerContainer.classList.add('hidden');
        if (resultsContainer) resultsContainer.classList.add('hidden');
        
        if (viewer && viewer.component && viewer.stage) {
            viewer.stage.removeComponent(viewer.component);
            viewer.component = null;
        }
        
        console.log('Limpo');
    });
}

console.log('Electrostatic Calculator carregado');
