document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMAÇÃO DE DIGITAÇÃO ATUALIZADA ---
    const typingElement = document.getElementById('typing-text');
    // Texto atualizado para a página BioParam
    const textToType = "Physicochemical parameter calculator for protein sequences.";
    const typingSpeed = 75;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    if (typingElement) {
        type();
    }
    
    // --- O RESTO DO CÓDIGO PERMANECE O MESMO ---
    const molecularWeights = { 'A': 89.09, 'R': 174.20, 'N': 132.12, 'D': 133.10, 'C': 121.16, 'E': 147.13, 'Q': 146.15, 'G': 75.07, 'H': 155.16, 'I': 131.17, 'L': 131.17, 'K': 146.19, 'M': 149.21, 'F': 165.19, 'P': 115.13, 'S': 105.09, 'T': 119.12, 'W': 204.23, 'Y': 181.19, 'V': 117.15 };
    const pKa = { 'N_term': 7.5, 'K': 10.5, 'R': 12.5, 'H': 6.5, 'D': 3.9, 'E': 4.3, 'C': 8.5, 'Y': 10.1, 'C_term': 3.5 };
    const kyteDoolittle = { 'A': 1.8, 'R': -4.5, 'N': -3.5, 'D': -3.5, 'C': 2.5, 'E': -3.5, 'Q': -3.5, 'G': -0.4, 'H': -3.2, 'I': 4.5, 'L': 3.8, 'K': -3.9, 'M': 1.9, 'F': 2.8, 'P': -1.6, 'S': -0.8, 'T': -0.7, 'W': -0.9, 'Y': -1.3, 'V': 4.2 };
    const extinctionCoefficients = { 'W': 5500, 'Y': 1490, 'C': 125 };

    const fastaInput = document.getElementById('fasta-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsOutput = document.getElementById('results-output');

    function parseSequence(fasta) {
        if (!fasta) return '';
        return fasta.replace(/^>.*$/m, '').replace(/\s/g, '').toUpperCase();
    }

    function calculateNetCharge(ph, sequence) {
        let charge = (1 / (1 + Math.pow(10, ph - pKa.N_term)));
        charge -= (1 / (1 + Math.pow(10, pKa.C_term - ph)));
        ['K', 'R', 'H'].forEach(aa => {
            charge += sequence.split(aa).length - 1 * (1 / (1 + Math.pow(10, ph - pKa[aa])));
        });
        ['D', 'E', 'C', 'Y'].forEach(aa => {
            charge -= sequence.split(aa).length - 1 * (1 / (1 + Math.pow(10, pKa[aa] - ph)));
        });
        return charge;
    }

    function calculatePI(sequence) {
        let ph = 7.0;
        let step = 3.5;
        for (let i = 0; i < 15; i++) {
            const charge = calculateNetCharge(ph, sequence);
            if (charge > 0) ph += step;
            else ph -= step;
            step /= 2;
        }
        return ph.toFixed(2);
    }
    
    calculateBtn.addEventListener('click', () => {
        const sequence = parseSequence(fastaInput.value);
        if (!sequence) {
            resultsOutput.innerHTML = '<p class="placeholder-text">Please enter a valid FASTA sequence.</p>';
            return;
        }

        const aaCount = sequence.length;
        const mw = (Object.keys(molecularWeights).reduce((sum, aa) => sum + (sequence.split(aa).length - 1) * molecularWeights[aa], 0) - (aaCount - 1) * 18.015).toFixed(2);
        const pI = calculatePI(sequence);
        const gravy = (sequence.split('').reduce((sum, aa) => sum + (kyteDoolittle[aa] || 0), 0) / aaCount).toFixed(3);
        const aliphaticIndex = ((sequence.split('A').length - 1) * 1.0 + (sequence.split('V').length - 1) * 2.9 + (sequence.split('I').length - 1) * 3.9 + (sequence.split('L').length - 1) * 3.9) / aaCount * 100;
        
        const counts = { W: sequence.split('W').length - 1, Y: sequence.split('Y').length - 1, C: sequence.split('C').length - 1 };
        const extCoeff1 = counts.W * extinctionCoefficients.W + counts.Y * extinctionCoefficients.Y;
        const extCoeff2 = extCoeff1 + counts.C * extinctionCoefficients.C;

        const composition = {};
        Object.keys(molecularWeights).forEach(aa => {
            const count = sequence.split(aa).length - 1;
            composition[aa] = { count, percent: ((count / aaCount) * 100).toFixed(2) };
        });

        let resultsHTML = `
            <table class="results-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Amino Acid Count</td><td>${aaCount}</td></tr>
                <tr><td>Molecular Weight</td><td>${mw} Da</td></tr>
                <tr><td>Theoretical pI</td><td>${pI}</td></tr>
                <tr><td>Aliphatic Index</td><td>${aliphaticIndex.toFixed(2)}</td></tr>
                <tr><td>GRAVY</td><td>${gravy}</td></tr>
                <tr><td colspan="2" class="sub-header">Extinction Coefficient (M<sup>-1</sup> cm<sup>-1</sup>)</td></tr>
                <tr><td>Assuming all Cys reduced</td><td>${extCoeff1}</td></tr>
                <tr><td>Assuming all Cys form cystines</td><td>${extCoeff2}</td></tr>
                <tr><td colspan="2" class="sub-header">Amino Acid Composition</td></tr>
        `;
        Object.keys(composition).forEach(aa => {
            resultsHTML += `<tr><td>${aa}</td><td>${composition[aa].count} (${composition[aa].percent}%)</td></tr>`;
        });
        resultsHTML += '</table>';
        
        resultsOutput.innerHTML = resultsHTML;
    });

    clearBtn.addEventListener('click', () => {
        fastaInput.value = '';
        resultsOutput.innerHTML = '<p class="placeholder-text">Results will be displayed here...</p>';
    });
});