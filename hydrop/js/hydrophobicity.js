document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMAÇÃO DE DIGITAÇÃO ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Predict transmembrane regions and analyze hydrophobicity profiles.";
        const typingSpeed = 75;
        let charIndex = 0;
        function type() { if (charIndex < textToType.length) { typingElement.textContent += textToType.charAt(charIndex++); setTimeout(type, typingSpeed); } }
        type();
    }

    // --- CONSTANTES E ELEMENTOS DO DOM ---
    const kyteDoolittle = { 'A': 1.8, 'R': -4.5, 'N': -3.5, 'D': -3.5, 'C': 2.5, 'E': -3.5, 'Q': -3.5, 'G': -0.4, 'H': -3.2, 'I': 4.5, 'L': 3.8, 'K': -3.9, 'M': 1.9, 'F': 2.8, 'P': -1.6, 'S': -0.8, 'T': -0.7, 'W': -0.9, 'Y': -1.3, 'V': 4.2 };
    
    const fastaInput = document.getElementById('fasta-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const plotDiv = document.getElementById('hydrophobicity-plot');
    const windowSizeSlider = document.getElementById('window-size-slider');
    const windowSizeValue = document.getElementById('window-size-value');

    // --- FUNÇÕES ---
    function parseSequence(fasta) {
        if (!fasta) return '';
        return fasta.replace(/^>.*$/m, '').replace(/\s/g, '').toUpperCase();
    }

    function calculateHydrophobicity(sequence, windowSize) {
        const scores = [];
        const positions = [];
        const halfWindow = Math.floor(windowSize / 2);

        for (let i = halfWindow; i < sequence.length - halfWindow; i++) {
            const windowSeq = sequence.substring(i - halfWindow, i + halfWindow + 1);
            let windowScore = 0;
            for (const aa of windowSeq) {
                windowScore += kyteDoolittle[aa] || 0;
            }
            scores.push(windowScore / windowSize);
            positions.push(i + 1);
        }
        return { positions, scores };
    }

    function plotHydrophobicity(positions, scores) {
        const data = [{
            x: positions,
            y: scores,
            type: 'scatter',
            mode: 'lines',
            line: {
                color: 'var(--color-primary)',
                width: 2
            }
        }];

        const layout = {
            title: 'Hydrophobicity Profile',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'var(--color-surface-light)',
            font: { color: 'var(--color-text-secondary)' },
            xaxis: {
                title: 'Residue Number',
                gridcolor: 'var(--color-border)'
            },
            yaxis: {
                title: 'Hydrophobicity Index',
                zerolinecolor: 'var(--color-danger)',
                gridcolor: 'var(--color-border)'
            },
            hovermode: 'x unified'
        };
        
        const config = { responsive: true };
        Plotly.newPlot(plotDiv, data, layout, config);
    }

    // --- EVENT LISTENERS ---
    windowSizeSlider.addEventListener('input', (event) => {
        windowSizeValue.textContent = event.target.value;
    });

    calculateBtn.addEventListener('click', () => {
        const sequence = parseSequence(fastaInput.value);
        const windowSize = parseInt(windowSizeSlider.value);
        if (sequence && sequence.length >= windowSize) {
            const { positions, scores } = calculateHydrophobicity(sequence, windowSize);
            plotHydrophobicity(positions, scores);
        } else {
            Plotly.purge(plotDiv); // Limpa o gráfico se a sequência for inválida
        }
    });
    
    clearBtn.addEventListener('click', () => {
        fastaInput.value = '';
        Plotly.purge(plotDiv);
    });
});