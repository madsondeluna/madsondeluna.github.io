// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Standard amino acid 3-letter to 1-letter code mapping
    const aminoAcidMap = {
        'ALA': 'A', 'ARG': 'R', 'ASN': 'N', 'ASP': 'D', 'CYS': 'C',
        'GLN': 'Q', 'GLU': 'E', 'GLY': 'G', 'HIS': 'H', 'ILE': 'I',
        'LEU': 'L', 'LYS': 'K', 'MET': 'M', 'PHE': 'F', 'PRO': 'P',
        'SER': 'S', 'THR': 'T', 'TRP': 'W', 'TYR': 'Y', 'VAL': 'V'
    };

    // Get references to DOM elements
    const pdbInput = document.getElementById('pdb-input');
    const fastaOutput = document.getElementById('fasta-output');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const pdbUpload = document.getElementById('pdb-upload');

    /**
     * Main function to convert PDB content to FASTA format.
     * @param {string} pdbContent - The PDB file content as a string.
     * @returns {string} - The formatted FASTA sequence.
     */
    function convertPdbToFasta(pdbContent) {
        if (!pdbContent.trim()) {
            return ''; // Return empty if input is null
        }

        const lines = pdbContent.split('\n');
        let sequence = '';
        let lastResidueId = null;
        let chainID = null;

        // Iterate over each line of the PDB file
        for (const line of lines) {
            // Process only ATOM records, which define amino acid atoms
            if (line.startsWith('ATOM')) {
                const residueName = line.substring(17, 20).trim();
                const currentChainID = line.substring(21, 22).trim();
                const residueSeqNum = parseInt(line.substring(22, 26).trim(), 10);
                const insertionCode = line.substring(26, 27).trim();
                
                // Build a unique identifier for the residue
                const currentResidueId = `${currentChainID}-${residueSeqNum}-${insertionCode}`;
                
                if (!chainID) {
                    chainID = currentChainID; // Capture the ID of the first chain found
                }

                // Ensure each residue is added only once
                if (currentResidueId !== lastResidueId) {
                    const oneLetterCode = aminoAcidMap[residueName];
                    if (oneLetterCode) {
                        sequence += oneLetterCode;
                    } else {
                        sequence += 'X'; // Use 'X' for unknown or non-standard residues
                    }
                    lastResidueId = currentResidueId;
                }
            }
        }
        
        if (!sequence) {
            return "No amino acid sequence found in ATOM records.";
        }

        // Format the FASTA output
        const header = `>Converted_Sequence|Chain_${chainID || 'A'}`;
        const formattedSequence = sequence.match(/.{1,60}/g).join('\n'); // Wrap lines at 60 characters
        
        return `${header}\n${formattedSequence}`;
    }

    // Add event listener to the convert button
    convertBtn.addEventListener('click', () => {
        const pdbData = pdbInput.value;
        const fastaData = convertPdbToFasta(pdbData);
        fastaOutput.value = fastaData;
    });

    // Add event listener to the clear button
    clearBtn.addEventListener('click', () => {
        pdbInput.value = '';
        fastaOutput.value = '';
        pdbUpload.value = ''; // Reset file input
    });
    
    // Add event listener to the copy button
    copyBtn.addEventListener('click', () => {
        if (fastaOutput.value) {
            fastaOutput.select();
            document.execCommand('copy');
            alert('FASTA sequence copied to clipboard!');
        }
    });

    // Add event listener for file upload
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