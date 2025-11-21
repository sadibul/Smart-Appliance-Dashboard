const API_BASE_URL = (window.API_BASE_URL || 'http://localhost:3000') + '/api';

const api = {
    async init() {
        const response = await fetch(`${API_BASE_URL}/init`);
        return await response.json();
    },
    async getLiveMetrics() {
        const response = await fetch(`${API_BASE_URL}/live`);
        return await response.json();
    },
    async controlDevice(command) {
        const response = await fetch(`${API_BASE_URL}/control`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command })
        });
        return await response.json();
    },
    async getTodayData() {
        const response = await fetch(`${API_BASE_URL}/energy/today`);
        return await response.json();
    },
    async getHistoricalData(days = 7) {
        const response = await fetch(`${API_BASE_URL}/energy/history?days=${days}`);
        return await response.json();
    },
    async getSummaryStats(period = 'month') {
        const response = await fetch(`${API_BASE_URL}/energy/stats?period=${period}`);
        return await response.json();
    }
};
