/**
 * Update statistics cards
 */
function updateStatistics() {
    if (!allData.stats) return;

    const stats = allData.stats;

    // Efficiency score (always 100 for now)
    const efficiencyScore = document.getElementById('efficiencyScore');
    if (efficiencyScore) {
        efficiencyScore.textContent = '100';
    }

    // Cost insights
    const costToday = document.getElementById('costToday');
    if (costToday) {
        costToday.textContent = 'No previous data';
    }

    const costMonth = document.getElementById('costMonth');
    if (costMonth && stats.todaysCost) {
        // Extract number from "৳X.XX" format
        const todayCost = parseFloat(stats.todaysCost.replace('৳', ''));
        const monthlyProjection = todayCost * 30;
        costMonth.textContent = `৳${monthlyProjection.toFixed(2)}`;
    }

    // Current status (using current power from live data)
    const currentStatus = document.getElementById('currentStatus');
    if (currentStatus && allData.live) {
        const power = allData.live.power || '0';
        currentStatus.textContent = `Normal operation (${power}W)`;
    }

    // Peak usage tips
    const peakUsage = document.getElementById('peakUsage');
    if (peakUsage && stats.peakUsage) {
        peakUsage.textContent = `Peak usage: ${stats.peakUsage}`;
    }

    // Smart tips based on usage
    updateSmartTips(stats);
}

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
    
    // Add active tips count
    const activeTips = document.getElementById('activeTips');
    if (activeTips) {
        activeTips.textContent = tips.length > 0 ? `${tips.length} Active Tips` : '0 Active Tips';
    }
    
    if (tips.length === 0) {
        tips.push({
            icon: '✓',
            text: 'No immediate energy saving opportunities identified'
        });
    }
    
    // Render tips
    tipsContainer.innerHTML = tips.map(tip => `
        <div class="tip-item">
            <span class="tip-icon">${tip.icon}</span>
            <span>${tip.text}</span>
        </div>
    `).join('');
}
