/**
 * Update smart tips based on usage patterns
 */
function updateSmartTips(stats) {
    const tipsContainer = document.getElementById('smartTips');
    if (!tipsContainer) return;

    const tips = [];
    
    // Parse peak and average usage
    const peak = parseFloat(stats.peakUsage);
    const avg = parseFloat(stats.averageUsage);
    
    if (peak > avg * 2) {
        tips.push({
            icon: '⚡',
            text: `Peak usage (${stats.peakUsage}) is significantly higher than average. Consider scheduling high-power tasks.`
        });
    }
    
    if (avg < 20) {
        tips.push({
            icon: '✓',
            text: 'Excellent! Your device maintains low average power consumption.'
        });
    }
    
    if (tips.length === 0) {
        tips.push({
            icon: '✓',
            text: 'No immediate energy saving opportunities identified'
        });
    }
    
    // Current status
    const power = allData.live ? allData.live.power : '0';
    
    // Render tips with active count and status
    tipsContainer.innerHTML = tips.map(tip => `
        <div class="tip-item">
            <span class="tip-icon">${tip.icon}</span>
            <span>${tip.text}</span>
        </div>
    `).join('') + `
        <div class="tip-item">
            <span class="tip-icon">📊</span>
            <span>${tips.length} Active Tips</span>
        </div>
        <div class="tip-item small">
            <span>Current Status: Normal operation (${power}W)</span>
        </div>
    `;
}

/**
 * Update summary table
 */
function updateSummaryTable() {
    // This function is called but the summary table uses different data structure
    // Keep empty for now or implement based on actual HTML structure
}
