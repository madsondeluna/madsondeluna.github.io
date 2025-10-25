// ==========================================================================
// 1. Typing Animation
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');
    const textToType = "Convert CSV files to FASTA format by selecting ID and sequence columns...";
    const typingSpeed = 75;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    if (typingElement) type();
});

// ==========================================================================
// 2. DOM Elements
// ==========================================================================
const csvUpload = document.getElementById('csv-upload');
const csvInput = document.getElementById('csv-input');
const fastaOutput = document.getElementById('fasta-output');
const idColumnSelect = document.getElementById('id-column');
const seqColumnSelect = document.getElementById('seq-column');
const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const statsBox = document.getElementById('stats');

let csvData = [];
let headers = [];

// ==========================================================================
// 3. File Upload Handler
// ==========================================================================
csvUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            csvInput.value = event.target.result;
            parseCSV(event.target.result);
        };
        reader.readAsText(file);
    }
});

// ==========================================================================
// 4. CSV Parser
// ==========================================================================
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return;

    // Parse header
    headers = lines[0].split(',').map(h => h.trim());
    
    // Parse data
    csvData = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            csvData.push(row);
        }
    }

    // Populate column selectors
    populateColumnSelectors();
}

// ==========================================================================
// 5. Column Selector Population
// ==========================================================================
function populateColumnSelectors() {
    // Clear existing options except first
    idColumnSelect.innerHTML = '<option value="">Select column...</option>';
    seqColumnSelect.innerHTML = '<option value="">Select column...</option>';

    // Add column options
    headers.forEach(header => {
        const idOption = document.createElement('option');
        idOption.value = header;
        idOption.textContent = header;
        idColumnSelect.appendChild(idOption);

        const seqOption = document.createElement('option');
        seqOption.value = header;
        seqOption.textContent = header;
        seqColumnSelect.appendChild(seqOption);
    });

    // Auto-detect likely columns
    autoDetectColumns();
}

// ==========================================================================
// 6. Auto-detect ID and Sequence Columns
// ==========================================================================
function autoDetectColumns() {
    const idKeywords = ['id', 'name', 'identifier', 'accession', 'header'];
    const seqKeywords = ['seq', 'sequence', 'peptide', 'protein', 'aa'];

    // Find ID column
    let idCol = headers.find(h => 
        idKeywords.some(keyword => h.toLowerCase().includes(keyword))
    );
    if (idCol) {
        idColumnSelect.value = idCol;
    } else if (headers.length > 0) {
        idColumnSelect.value = headers[0]; // Default to first column
    }

    // Find Sequence column
    let seqCol = headers.find(h => 
        seqKeywords.some(keyword => h.toLowerCase().includes(keyword))
    );
    if (seqCol) {
        seqColumnSelect.value = seqCol;
    } else if (headers.length > 1) {
        seqColumnSelect.value = headers[1]; // Default to second column
    }
}

// ==========================================================================
// 7. Convert to FASTA
// ==========================================================================
convertBtn.addEventListener('click', () => {
    const csvText = csvInput.value.trim();
    if (!csvText) {
        alert('Please provide CSV input first.');
        return;
    }

    // Parse if not already parsed
    if (csvData.length === 0) {
        parseCSV(csvText);
    }

    const idCol = idColumnSelect.value;
    const seqCol = seqColumnSelect.value;

    if (!idCol || !seqCol) {
        alert('Please select both ID and Sequence columns.');
        return;
    }

    if (idCol === seqCol) {
        alert('ID and Sequence columns must be different.');
        return;
    }

    // Generate FASTA
    let fastaText = '';
    let validEntries = 0;
    let invalidEntries = 0;

    csvData.forEach(row => {
        const id = row[idCol];
        const seq = row[seqCol];

        if (id && seq) {
            // Clean sequence (remove whitespace, validate amino acids)
            const cleanSeq = seq.replace(/\s/g, '').toUpperCase();
            if (isValidSequence(cleanSeq)) {
                fastaText += `>${id}\n${cleanSeq}\n`;
                validEntries++;
            } else {
                invalidEntries++;
            }
        } else {
            invalidEntries++;
        }
    });

    fastaOutput.value = fastaText;

    // Update stats
    updateStats(validEntries, invalidEntries);
});

// ==========================================================================
// 8. Validate Amino Acid Sequence
// ==========================================================================
function isValidSequence(seq) {
    // Allow standard amino acids + X for unknown
    const validPattern = /^[ACDEFGHIKLMNPQRSTVWYX]+$/;
    return validPattern.test(seq) && seq.length > 0;
}

// ==========================================================================
// 9. Update Statistics
// ==========================================================================
function updateStats(valid, invalid) {
    const total = valid + invalid;
    statsBox.innerHTML = `
        <p><strong>Conversion Stats:</strong></p>
        <p>✓ Valid entries: ${valid}</p>
        <p>✗ Invalid/skipped: ${invalid}</p>
        <p>Total processed: ${total}</p>
    `;
}

// ==========================================================================
// 10. Clear All
// ==========================================================================
clearBtn.addEventListener('click', () => {
    csvInput.value = '';
    fastaOutput.value = '';
    csvData = [];
    headers = [];
    idColumnSelect.innerHTML = '<option value="">Auto-detect</option>';
    seqColumnSelect.innerHTML = '<option value="">Auto-detect</option>';
    statsBox.innerHTML = '';
    csvUpload.value = '';
});

// ==========================================================================
// 11. Copy to Clipboard
// ==========================================================================
copyBtn.addEventListener('click', () => {
    const text = fastaOutput.value;
    if (!text) {
        alert('Nothing to copy. Please convert CSV first.');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
});

// ==========================================================================
// 12. Download FASTA
// ==========================================================================
downloadBtn.addEventListener('click', () => {
    const text = fastaOutput.value;
    if (!text) {
        alert('Nothing to download. Please convert CSV first.');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sequences.fasta';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// ==========================================================================
// 13. Auto-parse on Input Change
// ==========================================================================
csvInput.addEventListener('blur', () => {
    const csvText = csvInput.value.trim();
    if (csvText && csvData.length === 0) {
        parseCSV(csvText);
    }
});
