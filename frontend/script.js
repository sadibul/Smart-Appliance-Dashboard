let updateInterval = null;

async function initialize() {
    try {
        await api.init();
        initPowerDrawChart();
        initEnergyTrendChart();
        initUsagePatternsChart();
        await updateDashboard();
        updateInterval = setInterval(updateDashboard, 5000);
        
        const powerBtn = document.getElementById('powerButton');
        if (powerBtn) {
            powerBtn.addEventListener('click', handlePowerToggle);
        }
        
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        const exportJsonBtn = document.getElementById('exportJsonBtn');
        if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportToCSV);
        if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportToJSON);
        
        console.log('Dashboard initialized');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

async function updateDashboard() {
    try {
        const liveData = await api.getLiveMetrics();
        if (liveData.success) {
            updateMetricCards(liveData.data);
            updatePowerDrawChart(new Date().toLocaleTimeString(), parseFloat(liveData.data.power));
            updateSwitchState(liveData.data.switchState);
        }
        
        const historyData = await api.getHistoricalData(7);
        if (historyData.success) {
            updateEnergyTrendChart(historyData.data);
        }
        
        const todayData = await api.getTodayData();
        if (todayData.success && todayData.data) {
            updateUsagePatternsChart(todayData.data);
        }
        
        const stats = await api.getSummaryStats('month');
        if (stats.success) {
            updateSummaryTable(stats.data);
        }
    } catch (error) {
        console.error('Update error:', error);
    }
}

function updateMetricCards(data) {
    const elements = {
        powerValue: document.getElementById('powerValue'),
        voltageValue: document.getElementById('voltageValue'),
        currentValue: document.getElementById('currentValue'),
        energyValue: document.getElementById('energyValue'),
        hourlyCostValue: document.getElementById('hourlyCostValue'),
        dailyProjectionValue: document.getElementById('dailyProjectionValue'),
        statusText: document.getElementById('statusText')
    };
    
    if (elements.powerValue) elements.powerValue.textContent = `${data.power} W`;
    if (elements.voltageValue) elements.voltageValue.textContent = `${data.voltage} V`;
    if (elements.currentValue) elements.currentValue.textContent = `${data.current} mA`;
    if (elements.energyValue) elements.energyValue.textContent = `${data.totalEnergy} kWh`;
    if (elements.hourlyCostValue) elements.hourlyCostValue.textContent = `৳${data.hourlyCost}`;
    if (elements.dailyProjectionValue) elements.dailyProjectionValue.textContent = `৳${data.dailyProjection}`;
    if (elements.statusText) elements.statusText.textContent = 'Connected';
}

function updateSwitchState(isOn) {
    const powerBtn = document.getElementById('powerButton');
    if (!powerBtn) return;
    
    if (isOn) {
        powerBtn.textContent = 'Turn OFF';
        powerBtn.classList.remove('off');
        powerBtn.classList.add('on');
    } else {
        powerBtn.textContent = 'Turn ON';
        powerBtn.classList.remove('on');
        powerBtn.classList.add('off');
    }
}

async function handlePowerToggle() {
    const powerBtn = document.getElementById('powerButton');
    if (!powerBtn) return;
    
    try {
        powerBtn.disabled = true;
        const command = powerBtn.classList.contains('on') ? 'off' : 'on';
        const result = await api.controlDevice(command);
        
        if (result.success) {
            await updateDashboard();
        } else {
            alert('Failed to control device');
        }
    } catch (error) {
        console.error('Control error:', error);
        alert('Error controlling device');
    } finally {
        powerBtn.disabled = false;
    }
}

async function handlePeriodChange(period) {
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === period);
    });
    
    try {
        const stats = await api.getSummaryStats(period);
        if (stats.success) {
            updateSummaryTable(stats.data);
        }
    } catch (error) {
        console.error('Period change error:', error);
    }
}

function updateSummaryTable(stats) {
    const elements = {
        summaryTodayEnergy: document.getElementById('summaryTodayEnergy'),
        summaryWeekEnergy: document.getElementById('summaryWeekEnergy'),
        summaryMonthEnergy: document.getElementById('summaryMonthEnergy'),
        summaryTodayCost: document.getElementById('summaryTodayCost'),
        summaryWeekCost: document.getElementById('summaryWeekCost'),
        summaryMonthCost: document.getElementById('summaryMonthCost')
    };
    
    if (elements.summaryTodayEnergy && stats.today) {
        elements.summaryTodayEnergy.textContent = `${stats.today.energy} kWh`;
    }
    if (elements.summaryWeekEnergy && stats.week) {
        elements.summaryWeekEnergy.textContent = `${stats.week.energy} kWh`;
    }
    if (elements.summaryMonthEnergy && stats.month) {
        elements.summaryMonthEnergy.textContent = `${stats.month.energy} kWh`;
    }
    if (elements.summaryTodayCost && stats.today) {
        elements.summaryTodayCost.textContent = `৳${stats.today.cost}`;
    }
    if (elements.summaryWeekCost && stats.week) {
        elements.summaryWeekCost.textContent = `৳${stats.week.cost}`;
    }
    if (elements.summaryMonthCost && stats.month) {
        elements.summaryMonthCost.textContent = `৳${stats.month.cost}`;
    }
}

async function exportToCSV() {
    try {
        const historyData = await api.getHistoricalData(30);
        if (!historyData.success) return;
        
        let csv = 'Date,Energy (kWh),Cost (BDT)\n';
        historyData.data.forEach(row => {
            csv += `${row.date},${row.energy},${row.cost}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `energy-data-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Export CSV error:', error);
    }
}

async function exportToJSON() {
    try {
        const historyData = await api.getHistoricalData(30);
        if (!historyData.success) return;
        
        const json = JSON.stringify(historyData.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `energy-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Export JSON error:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
