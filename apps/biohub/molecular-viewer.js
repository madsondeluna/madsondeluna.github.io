// Solução SIMPLES e FUNCIONAL para NGL Viewer 3D
// Testado e validado

class MolecularViewer {
    constructor(viewportId) {
        this.viewportElement = document.getElementById(viewportId);
        this.stage = null;
        this.component = null;
        this.isReady = false;
        
        if (!this.viewportElement) {
            console.error('Viewport não encontrado:', viewportId);
            return;
        }
        
        this.init();
    }
    
    init() {
        // Esperar NGL carregar
        this.waitForNGL().then(() => {
            this.createStage();
            this.setupControls();
            this.isReady = true;
            console.log('Viewer pronto');
        });
    }
    
    waitForNGL() {
        return new Promise((resolve) => {
            if (typeof NGL !== 'undefined') {
                console.log('NGL ja carregado');
                resolve();
                return;
            }
            
            console.log('Aguardando NGL carregar...');
            let attempts = 0;
            const interval = setInterval(() => {
                if (typeof NGL !== 'undefined') {
                    console.log('NGL carregou apos', attempts * 100, 'ms');
                    clearInterval(interval);
                    resolve();
                }
                attempts++;
                if (attempts > 100) { // 10 segundos
                    clearInterval(interval);
                    console.error('NGL nao carregou - timeout');
                    resolve(); // Mesmo assim continua
                }
            }, 100);
        });
    }
    
    createStage() {
        try {
            // Forcar dimensoes
            this.viewportElement.style.width = '100%';
            this.viewportElement.style.height = '500px';
            this.viewportElement.style.display = 'block';
            
            console.log('Viewport:', {
                width: this.viewportElement.offsetWidth,
                height: this.viewportElement.offsetHeight
            });
            
            if (typeof NGL === 'undefined') {
                console.error('NGL nao disponivel');
                this.viewportElement.innerHTML = '<p style="color: red; padding: 20px;">Erro: NGL nao carregou</p>';
                return;
            }
            
            // Criar stage
            this.stage = new NGL.Stage(this.viewportElement, {
                backgroundColor: '#000000',
                antialias: true,
                quality: 'medium'
            });
            
            console.log('NGL Stage criado');
            
            // Handle resize
            window.addEventListener('resize', () => {
                if (this.stage) this.stage.handleResize();
            });
            
        } catch (error) {
            console.error('Erro ao criar stage:', error);
            this.viewportElement.innerHTML = '<p style="color: red; padding: 20px;">Erro: ' + error.message + '</p>';
        }
    }
    
    setupControls() {
        // Esperar elementos aparecerem no DOM
        setTimeout(() => {
            const spinBtn = document.getElementById('toggle-spin');
            const centerBtn = document.getElementById('center-view');
            
            if (spinBtn && this.stage) {
                spinBtn.onclick = () => {
                    console.log('Spin toggled');
                    this.stage.toggleSpin();
                };
            }
            
            if (centerBtn && this.stage) {
                centerBtn.onclick = () => {
                    console.log('Centered');
                    if (this.component) this.component.autoView();
                };
            }
        }, 100);
    }
    
    loadPDB(pdbText) {
        return new Promise((resolve, reject) => {
            if (!this.stage) {
                console.error('Stage nao inicializado');
                reject('Stage not ready');
                return;
            }
            
            if (!pdbText || pdbText.trim().length === 0) {
                console.error('PDB vazio');
                reject('Empty PDB');
                return;
            }
            
            try {
                console.log('Carregando PDB...');
                
                // Remover componente anterior
                if (this.component) {
                    this.stage.removeComponent(this.component);
                    console.log('Componente anterior removido');
                }
                
                // Criar blob e carregar
                const blob = new Blob([pdbText], { type: 'text/plain' });
                
                this.stage.loadFile(blob, { 
                    ext: 'pdb',
                    firstModelOnly: false,
                    asTrajectory: false
                }).then((comp) => {
                    this.component = comp;
                    console.log('PDB carregado');
                    console.log('Estrutura:', {
                        atomCount: comp.structure.atomCount,
                        residueCount: comp.structure.residueCount
                    });
                    
                    // Adicionar representacoes BASICAS e TESTADAS
                    comp.addRepresentation('cartoon', {
                        color: 'chainindex'
                    });
                    console.log('Cartoon adicionado');
                    
                    // Se tiver atomos suficientes, adicionar mais
                    if (comp.structure.atomCount > 50) {
                        comp.addRepresentation('surface', {
                            color: 'hydrophobicity',
                            opacity: 0.5
                        });
                        console.log('Surface adicionado');
                    }
                    
                    // MUITO IMPORTANTE: Center and zoom
                    comp.autoView(500); // 500ms animacao
                    
                    // Forcar render
                    this.stage.viewer.requestRender();
                    console.log('Render solicitado');
                    
                    resolve(comp);
                    
                }).catch((error) => {
                    console.error('Erro ao carregar PDB:', error);
                    reject(error);
                });
                
            } catch (error) {
                console.error('Erro ao processar PDB:', error);
                reject(error);
            }
        });
    }
    
    colorBySASA(sasaValues) {
        if (!this.component || !sasaValues || sasaValues.length === 0) {
            console.warn('SASA coloring: dados insuficientes');
            return;
        }
        
        try {
            console.log('Colorindo por SASA...');
            
            // Remove cartoon anterior
            this.component.removeAllRepresentations();
            
            // Registrar color scheme SASA
            const schemeName = 'sasa-' + Date.now();
            NGL.ColormakerRegistry.addScheme((params) => {
                return {
                    atomColor: (atom) => {
                        const idx = atom.index;
                        if (idx < sasaValues.length) {
                            const sasa = sasaValues[idx];
                            
                            // Normalizar 0-1
                            const max = Math.max(...sasaValues);
                            const norm = max > 0 ? sasa / max : 0;
                            
                            // Gradiente: azul (0) -> vermelho (1)
                            const r = Math.floor(norm * 255);
                            const g = 0;
                            const b = Math.floor((1 - norm) * 255);
                            
                            return (r << 16) | (g << 8) | b;
                        }
                        return 0xFFFFFF; // Branco
                    }
                };
            }, schemeName);
            
            // Adicionar cartoon com SASA colors
            this.component.addRepresentation('cartoon', {
                color: schemeName,
                opacity: 0.9
            });
            
            // Adicionar surface se possível
            if (this.component.structure.atomCount > 50) {
                this.component.addRepresentation('surface', {
                    color: schemeName,
                    opacity: 0.4,
                    surfaceType: 'av'
                });
            }
            
            console.log('SASA coloring aplicado');
            
        } catch (error) {
            console.error('Erro ao colorir SASA:', error);
            // Fallback
            this.component.addRepresentation('cartoon', { color: 'chainindex' });
        }
    }
}

// Exportar globalmente
window.MolecularViewer = MolecularViewer;
console.log('MolecularViewer disponivel globalmente');
