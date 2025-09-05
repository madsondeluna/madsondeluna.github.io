document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMAÇÃO DE DIGITAÇÃO ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Visualize residue interactions by generating a structural contact map.";
        const typingSpeed = 75;
        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }

    // --- ELEMENTOS DO DOM ---
    const pdbUpload = document.getElementById('pdb-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    const resultsSection = document.getElementById('results-section');
    const pdbInfoContainer = document.querySelector('.pdb-info-container');
    const heatmapPlot = document.getElementById('heatmap-plot');

    // --- LÓGICA PRINCIPAL ---
    pdbUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        fileNameDisplay.textContent = `Processing: ${file.name}...`;
        resultsSection.classList.remove('hidden');

        const reader = new FileReader();
        reader.onload = (e) => {
            const pdbContent = e.target.result;
            
            // 1. Parsear o arquivo PDB
            const pdbData = parsePDB(pdbContent);
            
            // 2. Exibir informações do PDB
            displayPDBInfo(pdbData.info);
            
            // 3. Calcular a matriz de contato
            const contactMatrix = calculateContactMap(pdbData.alphaCarbons);

            // 4. Plotar o heatmap
            plotHeatmap(contactMatrix, pdbData.residueLabels);
        };
        reader.readAsText(file);
    });

    /**
     * Parseia o conteúdo de um arquivo PDB para extrair informações e coordenadas C-alfa.
     * @param {string} pdbContent - O conteúdo textual do arquivo PDB.
     * @returns {object} - Um objeto com informações e coordenadas.
     */
    function parsePDB(pdbContent) {
        const lines = pdbContent.split('\n');
        const info = { chains: new Set(), residues: 0, atoms: 0, hetatms: 0 };
        const alphaCarbons = [];
        const residueLabels = [];
        const seenResidues = new Set();

        lines.forEach(line => {
            if (line.startsWith('ATOM')) {
                info.atoms++;
                const atomName = line.substring(12, 16).trim();
                if (atomName === 'CA') {
                    const chainID = line.substring(21, 22).trim();
                    const resSeq = parseInt(line.substring(22, 26).trim());
                    const resName = line.substring(17, 20).trim();
                    const residueId = `${chainID}-${resSeq}`;

                    if (!seenResidues.has(residueId)) {
                        info.chains.add(chainID);
                        seenResidues.add(residueId);
                        alphaCarbons.push({
                            x: parseFloat(line.substring(30, 38)),
                            y: parseFloat(line.substring(38, 46)),
                            z: parseFloat(line.substring(46, 54)),
                        });
                        residueLabels.push(`${resName}${resSeq}`);
                    }
                }
            } else if (line.startsWith('HETATM')) {
                info.hetatms++;
            }
        });
        info.residues = seenResidues.size;
        return { info, alphaCarbons, residueLabels };
    }

    /**
     * Exibe os dados extraídos do PDB em cartões de informação.
     * @param {object} info - O objeto de informações do PDB.
     */
    function displayPDBInfo(info) {
        pdbInfoContainer.innerHTML = `
            <div class="info-card"><h3>Chains</h3><p>${[...info.chains].join(', ') || 'N/A'}</p></div>
            <div class="info-card"><h3>Residues</h3><p>${info.residues}</p></div>
            <div class="info-card"><h3>Atoms</h3><p>${info.atoms}</p></div>
            <div class="info-card"><h3>Heteroatoms</h3><p>${info.hetatms}</p></div>
        `;
    }

    /**
     * Calcula a matriz de contato baseada na distância entre C-alfa.
     * @param {Array} alphaCarbons - Array de objetos com coordenadas {x, y, z}.
     * @param {number} [cutoff=8.0] - A distância de corte em Angstroms.
     * @returns {Array<Array<number>>} - A matriz 2D de contatos (0 ou 1).
     */
    function calculateContactMap(alphaCarbons, cutoff = 8.0) {
        const n = alphaCarbons.length;
        const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
        const cutoffSq = cutoff * cutoff;

        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const dx = alphaCarbons[i].x - alphaCarbons[j].x;
                const dy = alphaCarbons[i].y - alphaCarbons[j].y;
                const dz = alphaCarbons[i].z - alphaCarbons[j].z;
                const dSq = dx * dx + dy * dy + dz * dz;

                if (dSq < cutoffSq) {
                    matrix[i][j] = 1;
                    matrix[j][i] = 1;
                }
            }
        }
        return matrix;
    }

    /**
     * Usa Plotly.js para desenhar o heatmap da matriz de contato.
     * @param {Array<Array<number>>} matrix - A matriz de contatos.
     * @param {Array<string>} labels - Os rótulos dos resíduos para os eixos.
     */
    function plotHeatmap(matrix, labels) {
        const data = [{
            z: matrix,
            x: labels,
            y: labels,
            type: 'heatmap',
            colorscale: 'Greys',
            reversescale: true,
            showscale: false
        }];

        const layout = {
            title: 'Residue-Residue Contact Map (Cα < 8Å)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: 'var(--color-text-secondary)' },
            xaxis: { showticklabels: false },
            yaxis: { showticklabels: false },
            margin: { l: 40, r: 40, b: 40, t: 40 }
        };

        const config = { responsive: true };
        Plotly.newPlot(heatmapPlot, data, layout, config);
    }
});