document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMAÇÃO DE DIGITAÇÃO ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Visualize residue distances and structural data from a PDB file...";
        const typingSpeed = 75;
        let charIndex = 0;
        function type() { if (charIndex < textToType.length) { typingElement.textContent += textToType.charAt(charIndex++); setTimeout(type, typingSpeed); } }
        type();
    }

    // --- ELEMENTOS DO DOM ---
    const pdbUpload = document.getElementById('pdb-upload');
    const resultsSection = document.getElementById('results-section');
    const pdbInfoContainer = document.querySelector('.pdb-info-container');
    const heatmapPlot = document.getElementById('heatmap-plot');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const uploadButton = document.querySelector('.upload-btn');


    // --- FUNÇÃO HELPER PARA ATUALIZAR O PROGRESSO ---
    function updateProgress(percent, text) {
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${text} ${Math.round(percent)}%`;
    }

    // --- LÓGICA PRINCIPAL ---
    pdbUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Reset e exibe o loader
        resultsSection.classList.add('hidden');
        progressContainer.classList.remove('hidden');
        uploadButton.classList.add('hidden');
        updateProgress(0, 'Reading file...');

        const reader = new FileReader();

        // Evento para progresso REAL de leitura do arquivo
        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                const percentLoaded = (e.loaded / e.total);
                updateProgress(percentLoaded * 25, 'Reading file...');
            }
        };

        // Evento para quando o arquivo for completamente lido
        reader.onload = (e) => {
            updateProgress(25, 'Reading file...');
            
            setTimeout(() => {
                updateProgress(30, 'Parsing PDB structure...');
                const pdbContent = e.target.result;
                const pdbData = parsePDB(pdbContent);

                setTimeout(() => {
                    updateProgress(60, 'Calculating distance matrix...');
                    const distanceMatrix = calculateDistanceMatrix(pdbData.alphaCarbons);

                    setTimeout(() => {
                        updateProgress(90, 'Rendering heatmap...');
                        displayPDBInfo(pdbData.info);
                        plotDistanceHeatmap(distanceMatrix, pdbData.residueLabels);
                        
                        updateProgress(100, 'Done!');
                        
                        setTimeout(() => {
                            resultsSection.classList.remove('hidden');
                            progressContainer.classList.add('hidden');
                            uploadButton.classList.remove('hidden');
                        }, 500);

                    }, 50);
                }, 50);
            }, 50);
        };
        
        reader.readAsText(file);
    });

    // --- FUNÇÕES DE CÁLCULO E PARSEAMENTO ---
    function parsePDB(pdbContent) {
        const lines = pdbContent.split('\n');
        const info = { title: '', method: 'N/A', resolution: 'N/A', chains: new Set(), residues: 0, atoms: 0, hetatms: 0, helices: 0, sheets: 0 };
        const alphaCarbons = [];
        const residueLabels = [];
        const seenResidues = new Set();
        lines.forEach(line => {
            const recordType = line.substring(0, 6).trim();
            switch (recordType) {
                case 'TITLE': if (!info.title) info.title = line.substring(10).trim(); break;
                case 'EXPDTA': info.method = line.substring(10).trim(); break;
                case 'REMARK': if (line.includes("RESOLUTION.")) { const match = line.match(/RESOLUTION\.\s+([\d.]+)\s+ANGSTROMS/); if (match) info.resolution = match[1]; } break;
                case 'HELIX': info.helices++; break;
                case 'SHEET': info.sheets++; break;
                case 'ATOM':
                    info.atoms++;
                    if (line.substring(12, 16).trim() === 'CA') {
                        const chainID = line.substring(21, 22).trim();
                        const resSeq = parseInt(line.substring(22, 26).trim());
                        const resName = line.substring(17, 20).trim();
                        const residueId = `${chainID}-${resSeq}`;
                        if (!seenResidues.has(residueId)) {
                            info.chains.add(chainID);
                            seenResidues.add(residueId);
                            alphaCarbons.push({ x: parseFloat(line.substring(30, 38)), y: parseFloat(line.substring(38, 46)), z: parseFloat(line.substring(46, 54)) });
                            residueLabels.push(`${resName}${resSeq}`);
                        }
                    }
                    break;
                case 'HETATM': info.hetatms++; break;
            }
        });
        info.residues = seenResidues.size;
        return { info, alphaCarbons, residueLabels };
    }

    function displayPDBInfo(info) {
        pdbInfoContainer.innerHTML = `
            <div class="info-card"><h3>Title</h3><p class="small-text">${info.title || 'N/A'}</p></div>
            <div class="info-card"><h3>Method</h3><p class="small-text">${info.method}</p></div>
            <div class="info-card"><h3>Resolution</h3><p>${info.resolution} Å</p></div>
            <div class="info-card"><h3>Chains</h3><p>${[...info.chains].join(', ') || 'N/A'}</p></div>
            <div class="info-card"><h3>Residues</h3><p>${info.residues}</p></div>
            <div class="info-card"><h3>Helices</h3><p>${info.helices}</p></div>
            <div class="info-card"><h3>Sheets</h3><p>${info.sheets}</p></div>`;
    }

    function calculateDistanceMatrix(alphaCarbons) {
        const n = alphaCarbons.length;
        const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const dx = alphaCarbons[i].x - alphaCarbons[j].x;
                const dy = alphaCarbons[i].y - alphaCarbons[j].y;
                const dz = alphaCarbons[i].z - alphaCarbons[j].z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                matrix[i][j] = distance;
                matrix[j][i] = distance;
            }
        }
        return matrix;
    }

    function plotDistanceHeatmap(matrix, labels) {
        const data = [{
            z: matrix,
            x: labels,
            y: labels,
            type: 'heatmap',
            colorscale: 'RdBu',
            reversescale: true,
            showscale: true,
            colorbar: {
                title: 'Distance (Å)',
                titleside: 'right',
                tickfont: { color: '#333' },
                titlefont: { color: '#333' }
            },
            hovertemplate: '<b>Interaction</b><br>' +
                           'Residue 1: %{y}<br>' +
                           'Residue 2: %{x}<br>' +
                           'Distance: %{z:.2f} Å' +
                           '<extra></extra>'
        }];
        
        const plotContainer = document.getElementById('heatmap-plot');
        // Usar requestAnimationFrame para garantir que o DOM foi renderizado antes de pegar a largura
        requestAnimationFrame(() => {
            const containerWidth = plotContainer.offsetWidth; // Pega a largura do container
            const squareSize = Math.min(containerWidth, window.innerHeight * 0.9); // Tenta usar 90% da altura da janela como max

            const layout = {
                title: {
                    text: 'Residue-Residue Distance Matrix (Cα, Å)',
                    font: {
                        color: '#333' // Cor do título do gráfico
                    }
                },
                paper_bgcolor: '#ffffff', // Fundo BRANCO para o paper (incluindo margens e título)
                plot_bgcolor: '#ffffff',  // Fundo BRANCO para a área interna do gráfico
                font: { color: '#333' },    // Cor escura para os textos em geral
                width: squareSize,            // Define a largura do gráfico
                height: squareSize,           // Define a ALTURA do gráfico igual à largura (QUADRADO)
                xaxis: { 
                    showticklabels: false, 
                    ticks: '',
                    automargin: true // Ajuda a evitar cortes no eixo
                },
                yaxis: { 
                    showticklabels: false, 
                    ticks: '',
                    automargin: true // Ajuda a evitar cortes no eixo
                },
                margin: { // Ajusta as margens para a barra de cores não ser cortada
                    l: 50, // left margin
                    r: 80, // right margin (give space for colorbar)
                    b: 50, // bottom margin
                    t: 80, // top margin (give space for title)
                    pad: 4 // padding between plot and axis labels
                }
            };

            const config = { 
                responsive: true, // Ainda responsivo para se ajustar ao container
                displayModeBar: true // Opcional: mostra a barra de ferramentas do Plotly
            };
            Plotly.newPlot(heatmapPlot, data, layout, config);
        }); // Fim do requestAnimationFrame
    }
});