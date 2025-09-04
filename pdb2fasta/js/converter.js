document.addEventListener('DOMContentLoaded', () => {

    // NEW
    const typingElement = document.getElementById('typing-text');
    const textToType = "Paste or upload a PDB file to convert it to FASTA..."; // A frase que você quer animar
    const typingSpeed = 75; // Velocidade em milissegundos. Ajuste conforme desejar.
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Inicia a animação assim que a página carrega
    if (typingElement) {
        type();
    }
    // NEW

    const aminoAcidMap = {
        'ALA': 'A', 'ARG': 'R', 'ASN': 'N', 'ASP': 'D', 'CYS': 'C',
        'GLN': 'Q', 'GLU': 'E', 'GLY': 'G', 'HIS': 'H', 'ILE': 'I',
        'LEU': 'L', 'LYS': 'K', 'MET': 'M', 'PHE': 'F', 'PRO': 'P',
        'SER': 'S', 'THR': 'T', 'TRP': 'W', 'TYR': 'Y', 'VAL': 'V'
    };

    const pdbInput = document.getElementById('pdb-input');
    const fastaOutput = document.getElementById('fasta-output');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const pdbUpload = document.getElementById('pdb-upload');

    function convertPdbToFasta(pdbContent) {
        if (!pdbContent.trim()) {
            return '';
        }

        const lines = pdbContent.split('\n');
        let sequence = '';
        let lastResidueId = null;
        let chainID = null;

        for (const line of lines) {
            if (line.startsWith('ATOM')) {
                const residueName = line.substring(17, 20).trim();
                const currentChainID = line.substring(21, 22).trim();
                const residueSeqNum = parseInt(line.substring(22, 26).trim(), 10);
                const insertionCode = line.substring(26, 27).trim();
                
                const currentResidueId = `${currentChainID}-${residueSeqNum}-${insertionCode}`;
                
                if (!chainID) {
                    chainID = currentChainID;
                }

                if (currentResidueId !== lastResidueId) {
                    const oneLetterCode = aminoAcidMap[residueName];
                    if (oneLetterCode) {
                        sequence += oneLetterCode;
                    } else {
                        sequence += 'X';
                    }
                    lastResidueId = currentResidueId;
                }
            }
        }
        
        if (!sequence) {
            return "No amino acid sequence found in ATOM records.";
        }

        const header = `>Converted_Sequence|Chain_${chainID || 'A'}`;
        const formattedSequence = sequence.match(/.{1,60}/g).join('\n');
        
        return `${header}\n${formattedSequence}`;
    }

    convertBtn.addEventListener('click', () => {
        const pdbData = pdbInput.value;
        const fastaData = convertPdbToFasta(pdbData);
        fastaOutput.value = fastaData;
    });

    clearBtn.addEventListener('click', () => {
        pdbInput.value = '';
        fastaOutput.value = '';
        pdbUpload.value = '';
    });
    
    copyBtn.addEventListener('click', () => {
        if (fastaOutput.value) {
            fastaOutput.select();
            document.execCommand('copy');
            alert('FASTA sequence copied to clipboard!');
        }
    });

    pdbUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                pdbInput.value = e.target.result;
            };
            reader.readAsText(file);
        }
    });
});