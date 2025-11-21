let powerDrawChart = null;
let energyTrendChart = null;
let usagePatternsChart = null;

function initPowerDrawChart() {
    const ctx = document.getElementById('powerDrawChart').getContext('2d');
    powerDrawChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Power (W)',
                data: [],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    suggestedMax: 50,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.08)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 8
                    },
                    title: { 
                        display: true,
                        text: 'Watts',
                        color: '#cbd5e1',
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        padding: { bottom: 10 }
                    }
                },
                x: { 
                    grid: {
                        color: 'rgba(148, 163, 184, 0.08)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 10,
                            weight: '500'
                        },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    title: { 
                        display: true,
                        text: 'Time',
                        color: '#cbd5e1',
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        padding: { top: 10 }
                    }
                }
            },
            plugins: { 
                legend: { 
                    display: false
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function initEnergyTrendChart() {
    const ctx = document.getElementById('energyTrendChart').getContext('2d');
    energyTrendChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Energy (kWh)',
                data: [],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return '#36a2eb';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
                    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.95)');
                    return gradient;
                },
                borderColor: '#a855f7',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.08)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 8
                    },
                    title: { 
                        display: true,
                        text: 'Energy (kWh)',
                        color: '#cbd5e1',
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        padding: { bottom: 10 }
                    }
                },
                x: { 
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        maxRotation: 0,
                        minRotation: 0
                    },
                    title: { 
                        display: false
                    }
                }
            },
            plugins: { 
                legend: { 
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rect',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.formattedValue + ' kWh';
                        }
                    }
                }
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function initUsagePatternsChart() {
    const ctx = document.getElementById('usagePatternsChart').getContext('2d');
    usagePatternsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Avg Power (W)',
                data: [],
                borderColor: '#ec4899',
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return 'rgba(236, 72, 153, 0.1)';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.05)');
                    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.3)');
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ec4899',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ec4899',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        padding: 8
                    },
                    title: { 
                        display: true,
                        text: 'Power (W)',
                        color: '#cbd5e1',
                        font: {
                            size: 12,
                            weight: '700'
                        },
                        padding: { bottom: 10 }
                    }
                },
                x: { 
                    grid: {
                        color: 'rgba(148, 163, 184, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 10,
                            weight: '600'
                        }
                    },
                    title: { 
                        display: true,
                        text: 'Hour of Day',
                        color: '#cbd5e1',
                        font: {
                            size: 12,
                            weight: '700'
                        },
                        padding: { top: 10 }
                    }
                }
            },
            plugins: { 
                legend: { 
                    display: true,
                    labels: {
                        color: '#cbd5e1',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(236, 72, 153, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.formattedValue + ' W';
                        }
                    }
                }
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function updatePowerDrawChart(time, power) {
    if (!powerDrawChart) return;
    powerDrawChart.data.labels.push(time);
    powerDrawChart.data.datasets[0].data.push(power);
    if (powerDrawChart.data.labels.length > 20) {
        powerDrawChart.data.labels.shift();
        powerDrawChart.data.datasets[0].data.shift();
    }
    // Use default animation mode instead of 'none' to enable smooth transitions
    powerDrawChart.update();
}

function updateEnergyTrendChart(data) {
    if (!energyTrendChart || !data) return;
    
    // Format dates to show as "Nov 15", "Nov 16", etc.
    const formattedLabels = data.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    energyTrendChart.data.labels = formattedLabels;
    energyTrendChart.data.datasets[0].data = data.map(d => d.energy);
    energyTrendChart.update();
}

function updateUsagePatternsChart(data) {
    if (!usagePatternsChart || !data) return;
    usagePatternsChart.data.labels = data.map(d => d.hour);
    usagePatternsChart.data.datasets[0].data = data.map(d => d.avgPower);
    usagePatternsChart.update();
}
