document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMAÇÃO DE DIGITAÇÃO ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Interactive 3D molecular viewer for PDB files...";
        const typingSpeed = 75;
        let charIndex = 0;
        function type() { if (charIndex < textToType.length) { typingElement.textContent += textToType.charAt(charIndex++); setTimeout(type, typingSpeed); } }
        type();
    }

    // --- INICIALIZAÇÃO DO NGL ---
    // NGL nao le var(): o fundo do palco vem do token JA resolvido, e
    // volta a ser lido a cada troca de modo.
    function stageBg() {
        const probe = document.createElement("div");
        probe.style.cssText = "position:absolute;visibility:hidden;color:var(--dim)";
        document.body.appendChild(probe);
        const c = getComputedStyle(probe).color;
        probe.remove();
        return c;
    }
    const stage = new NGL.Stage("viewport", { backgroundColor: stageBg() });
    document.querySelectorAll(".mode-btn").forEach((b) =>
        b.addEventListener("click", () =>
            requestAnimationFrame(() => stage.setParameters({ backgroundColor: stageBg() }))));
    let currentStructure; // Variável para armazenar a estrutura carregada

    // --- ELEMENTOS DO DOM ---
    const pdbUpload = document.getElementById('pdb-upload-3d');
    const fileNameDisplay = document.getElementById('file-name-display-3d');
    const representationSelect = document.getElementById('representation-select');
    const colorSelect = document.getElementById('color-select');
    const centerBtn = document.getElementById('center-btn');
    const spinBtn = document.getElementById('spin-btn');

    // --- FUNÇÕES ---
    function handleResize() {
        stage.handleResize();
    }

    function loadStructure(file) {
        if (!file) return;
        
        fileNameDisplay.textContent = `Loading: ${file.name}...`;
        stage.removeAllComponents(); // Limpa a visualização anterior

        stage.loadFile(file).then(component => {
            currentStructure = component; // Armazena o componente da estrutura
            
            // Adiciona a representação padrão
            component.addRepresentation(representationSelect.value, {
                color: colorSelect.value
            });
            
            component.autoView(); // Centraliza a câmera na estrutura
            fileNameDisplay.textContent = `Loaded: ${file.name}`;
        }).catch(error => {
            console.error(error);
            fileNameDisplay.textContent = "Error loading file.";
        });
    }

    function updateRepresentation() {
        if (currentStructure) {
            currentStructure.removeAllRepresentations();
            currentStructure.addRepresentation(representationSelect.value, {
                color: colorSelect.value
            });
        }
    }

    // --- EVENT LISTENERS ---
    window.addEventListener("resize", handleResize, false);
    
    pdbUpload.addEventListener('change', (event) => {
        loadStructure(event.target.files[0]);
    });

    representationSelect.addEventListener('change', updateRepresentation);
    colorSelect.addEventListener('change', updateRepresentation);

    centerBtn.addEventListener('click', () => {
        if (currentStructure) currentStructure.autoView();
    });

    spinBtn.addEventListener('click', () => {
        stage.toggleSpin();
    });
});