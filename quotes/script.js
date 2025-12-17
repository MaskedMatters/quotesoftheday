let quotes = [];
let todayIndex = 0;   // The calculated max index based on real time
let currentIndex = 0; // The index the user is currently viewing

async function init() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();

        // 1. Set Start Date: Dec 7, 2025, 08:00:00 EST (UTC-5)
        const startDate = new Date('2025-12-07T08:00:00-05:00');
        const now = new Date();

        // 2. Calculate time difference
        const diffInMs = now - startDate;
        
        // 3. Convert to full days (floored)
        // If it's 7:59 AM on Dec 8th, it's still Day 0. 
        // At 8:00 AM on Dec 8th, it becomes Day 1.
        todayIndex = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        // Handle pre-launch case (if someone opens it before 8am EST Dec 7)
        if (todayIndex < 0) todayIndex = 0;
        
        // Handle running out of quotes (Stop at the last quote)
        if (todayIndex >= quotes.length) todayIndex = quotes.length - 1;

        // Initialize view at the current day
        currentIndex = todayIndex;
        
        renderQuote();

    } catch (error) {
        console.error('Error loading quotes:', error);
        document.getElementById('quote').textContent = "Could not load quote. Please check quotes.json.";
    }
}

function renderQuote() {
    const quoteData = quotes[currentIndex];
    
    // Update text
    document.getElementById('quote').textContent = `"${quoteData.text}"`;
    document.getElementById('author').textContent = quoteData.author;

    // Update Date Display
    // We calculate the date shown based on the Start Date + currentIndex
    const startDate = new Date('2025-12-07T08:00:00-05:00');
    const displayDate = new Date(startDate.getTime() + (currentIndex * 24 * 60 * 60 * 1000));
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').textContent = displayDate.toLocaleDateString('en-US', options);

    updateButtons();
}

function changeDay(direction) {
    const newIndex = currentIndex + direction;

    // Boundary checks
    if (newIndex < 0) return; // Can't go before Day 1
    if (newIndex > todayIndex) return; // Can't go into the future

    currentIndex = newIndex;
    renderQuote();
}

function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Disable Prev if we are at the first quote
    prevBtn.disabled = (currentIndex === 0);

    // Disable Next if we are at the current real-time day
    nextBtn.disabled = (currentIndex === todayIndex);
}

// Helper to make changeDay available globally since we are in a module-like structure
window.changeDay = changeDay;

// Run initialization
init();