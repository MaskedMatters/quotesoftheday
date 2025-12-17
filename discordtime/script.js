// Configuration for different Discord formats
const formats = [
    { code: 'R', label: 'Relative Time', desc: 'e.g., 2 hours ago' },
    { code: 't', label: 'Short Time', desc: 'e.g., 9:41 PM' },
    { code: 'T', label: 'Long Time', desc: 'e.g., 9:41:30 PM' },
    { code: 'd', label: 'Short Date', desc: 'e.g., 30/06/2025' },
    { code: 'D', label: 'Long Date', desc: 'e.g., 30 June 2025' },
    { code: 'f', label: 'Short Date/Time', desc: 'e.g., 30 June 2025 9:41 PM' },
    { code: 'F', label: 'Long Date/Time', desc: 'e.g., Tuesday, 30 June 2025 9:41 PM' }
];

const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const outputContainer = document.getElementById('outputContainer');

// Initialize with current date/time
function setDefaults() {
    const now = new Date();
    // Format to YYYY-MM-DD
    const dateStr = now.toISOString().split('T')[0];
    // Format to HH:MM
    const timeStr = now.toTimeString().substring(0, 5);

    dateInput.value = dateStr;
    timeInput.value = timeStr;
}

// Generate the HTML for the list
function renderList() {
    outputContainer.innerHTML = '';
    const unixTime = getUnixTimestamp();

    formats.forEach(fmt => {
        const codeString = `<t:${unixTime}:${fmt.code}>`;
        
        // Create preview text based on format
        let previewText = getPreviewText(unixTime, fmt.code);

        const card = document.createElement('div');
        card.className = 'output-card';
        card.innerHTML = `
            <div class="preview-info">
                <span class="preview-label">${fmt.label} (${fmt.code})</span>
                <span class="discord-preview">${previewText}</span>
            </div>
            <button class="copy-btn" onclick="copyToClipboard(this, '${codeString}')">Copy</button>
        `;
        outputContainer.appendChild(card);
    });
}

// Calculate Unix Timestamp (seconds) from inputs
function getUnixTimestamp() {
    if (!dateInput.value || !timeInput.value) return 0;
    const dateObj = new Date(`${dateInput.value}T${timeInput.value}`);
    return Math.floor(dateObj.getTime() / 1000);
}

// Approximate what Discord shows (for the preview)
function getPreviewText(unix, code) {
    const date = new Date(unix * 1000);
    
    switch(code) {
        case 't': return date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
        case 'T': return date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', second:'2-digit'});
        case 'd': return date.toLocaleDateString();
        case 'D': return date.toLocaleDateString([], {day: 'numeric', month: 'long', year: 'numeric'});
        case 'f': return date.toLocaleString([], {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute:'2-digit'});
        case 'F': return date.toLocaleString([], {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute:'2-digit'});
        case 'R': 
            // Simple relative time approximation
            const diff = (new Date().getTime() / 1000) - unix;
            if (diff > 0) return "in the past";
            return "in the future";
        default: return "";
    }
}

// Copy function
window.copyToClipboard = function(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('copied');
        }, 1500);
    });
}

// Event Listeners
dateInput.addEventListener('input', renderList);
timeInput.addEventListener('input', renderList);

// Initial run
setDefaults();
renderList();