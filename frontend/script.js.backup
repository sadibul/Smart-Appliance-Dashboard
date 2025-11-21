// Dashboard State
let currentDeviceState = false;
let refreshInterval = null;
let allData = {
    live: null,
    today: null,
    history: null,
    stats: null
};

/**
 * Initialize dashboard
 */
async function initDashboard() {
    console.log('Initializing dashboard...');
    
    // Initialize charts
    initAllCharts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    await refreshAllData();
    
    // Start auto-refresh (every 5 seconds)
    refreshInterval = setInterval(refreshLiveMetrics, 5000);
    
    console.log('Dashboard initialized successfully');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Power button
    const powerButton = document.getElementById('powerButton');
    if (powerButton) {
        powerButton.addEventListener('click', handlePowerToggle);
    }

    // Export buttons
    const exportCSV = document.getElementById('exportCSV');
    if (exportCSV) {
        exportCSV.addEventListener('click', handleExportCSV);
    }

    const exportJSON = document.getElementById('exportJSON');
    if (exportJSON) {
        exportJSON.addEventListener('click', handleExportJSON);
    }

    // Summary period selector
    const summaryPeriod = document.getElementById('summaryPeriod');
    if (summaryPeriod) {
        summaryPeriod.addEventListener('change', updateSummaryTable);
    }
}

/**
 * Refresh all data
 */
async function refreshAllData() {
    try {
        updateConnectionStatus('fetching');
        
        // Fetch all data in parallel
        const [liveResponse, todayResponse, historyResponse, statsResponse] = await Promise.all([
            api.getLiveMetrics(),
            api.getTodayData(),
            api.getHistoricalData(7),
            api.getSummaryStats()
        ]);

        // Store data
        allData.live = liveResponse.data;
        allData.today = todayResponse.data;
        allData.history = historyResponse.data;
        allData.stats = statsResponse.data;

        // Update UI
        updateLiveMetrics(allData.live);
        updateCharts();
        updateStatistics();
        updateSummaryTable();
        
        updateConnectionStatus('online');
    } catch (error) {
        console.error('Error refreshing data:', error);
        updateConnectionStatus('offline');
    }
}

/**
 * Refresh only live metrics
 */
async function refreshLiveMetrics() {
    try {
        const response = await api.getLiveMetrics();
        allData.live = response.data;
        updateLiveMetrics(allData.live);
        
        // Update power draw chart
        if (allData.live && allData.live.power) {
            updatePowerDrawChart(allData.live.power);
        }
        
        updateConnectionStatus('online');
    } catch (error) {
        console.error('Error refreshing live metrics:', error);
        updateConnectionStatus('offline');
    }
}

/**
 * Update live metrics display
 */
function updateLiveMetrics(data) {
    if (!data) return;

    // Update power draw
    const powerValue = document.getElementById('powerValue');
    if (powerValue) {
        powerValue.textContent = `${data.power} W`;
    }

    // Update total energy
    const totalEnergy = document.getElementById('totalEnergy');
    if (totalEnergy) {
        totalEnergy.textContent = `${data.totalEnergy} kWh`;
    }

    // Update hourly cost
    const hourlyCost = document.getElementById('hourlyCost');
    if (hourlyCost) {
        hourlyCost.textContent = `৳${data.hourlyCost}/hr`;
    }

    // Update daily projection
    const dailyProjection = document.getElementById('dailyProjection');
    if (dailyProjection) {
        dailyProjection.textContent = `৳${data.dailyProjection}`;
    }

    // Update voltage
    const voltage = document.getElementById('voltage');
    if (voltage) {
        voltage.textContent = `${data.voltage}V`;
    }

    // Update current
    const current = document.getElementById('current');
    if (current) {
        current.textContent = `${data.current}mA`;
    }

    // Update last update time
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate && data.timestamp) {
        const time = new Date(data.timestamp).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        lastUpdate.textContent = `Last update: ${time}`;
    }

    // Update power button state
    currentDeviceState = data.switchState;
    updatePowerButton(data.switchState);
}

/**
 * Update charts with current data
 */
function updateCharts() {
    // Update energy trend chart
    if (allData.history) {
        updateEnergyTrendChart(allData.history);
    }

    // Update usage patterns chart
    if (allData.today) {
        updateUsagePatternsChart(allData.today);
    }
}

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

    // Cost insights - Monthly Projection
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

/**
 * Update summary table
 */
    const summaryTodayCost = document.getElementById('summaryTodayCost');
    if (summaryTodayCost && stats.today) {
        summaryTodayCost.textContent = `৳${stats.today.cost}`;
    }

    // This week's cost
    const summaryWeekCost = document.getElementById('summaryWeekCost');
    if (summaryWeekCost && stats.week) {
        summaryWeekCost.textContent = `৳${stats.week.cost}`;
    }
}

/**
 * Handle power toggle
 */
async function handlePowerToggle() {
    const powerButton = document.getElementById('powerButton');
    if (!powerButton) return;

    powerButton.disabled = true;
    
    try {
        const command = currentDeviceState ? 'off' : 'on';
        const response = await api.controlDevice(command);
        
        if (response.success) {
            currentDeviceState = !currentDeviceState;
            updatePowerButton(currentDeviceState);
            
            // Refresh metrics after a short delay
            setTimeout(refreshLiveMetrics, 2000);
        }
    } catch (error) {
        console.error('Error toggling power:', error);
        alert('Failed to control device. Please try again.');
    } finally {
        powerButton.disabled = false;
    }
}

/**
 * Update power button display
 */
function updatePowerButton(isOn) {
    const powerButton = document.getElementById('powerButton');
    const powerButtonText = document.getElementById('powerButtonText');
    
    if (!powerButton || !powerButtonText) return;

    if (isOn) {
        powerButton.classList.add('active');
        powerButtonText.textContent = 'Turn OFF';
    } else {
        powerButton.classList.remove('active');
        powerButtonText.textContent = 'Turn ON';
    }
}

/**
 * Update connection status indicator
 */
function updateConnectionStatus(status) {
    const connectionStatus = document.getElementById('connectionStatus');
    if (!connectionStatus) return;

    const statusDot = connectionStatus.querySelector('.status-dot');
    const statusText = connectionStatus.querySelector('span:last-child');

    switch (status) {
        case 'online':
            if (statusDot) statusDot.className = 'status-dot online';
            if (statusText) statusText.textContent = 'Connected';
            break;
        case 'offline':
            if (statusDot) statusDot.className = 'status-dot offline';
            if (statusText) statusText.textContent = 'Disconnected';
            break;
        case 'fetching':
            if (statusDot) statusDot.className = 'status-dot fetching';
            if (statusText) statusText.textContent = 'Fetching...';
            break;
    }
}

/**
 * Export data as CSV
 */
function handleExportCSV() {
    if (!allData.today || allData.today.length === 0) {
        alert('No data available to export');
        return;
    }

    // Create CSV content
    let csv = 'Time,Energy (kWh),Power (W)\n';
    allData.today.forEach(row => {
        csv += `${row.time},${row.energy},${row.power}\n`;
    });

    // Download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

/**
 * Export data as JSON
 */
function handleExportJSON() {
    if (!allData.live) {
        alert('No data available to export');
        return;
    }

    // Create JSON content
    const exportData = {
        timestamp: new Date().toISOString(),
        liveMetrics: allData.live,
        todayData: allData.today,
        historicalData: allData.history,
        statistics: allData.stats
    };

    const json = JSON.stringify(exportData, null, 2);

    // Download file
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize dashboard when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});
