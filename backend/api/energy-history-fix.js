// Replace getSummaryStats function (lines ~6-60) with this:

async function getSummaryStats(period = 'today') {
  try {
    const { getDeviceStatus } = require('./live-metrics');
    
    let currentPower = 29;
    try {
      const status = await getDeviceStatus();
      const powerStatus = status.find(s => s.code === 'cur_power');
      if (powerStatus && powerStatus.value) {
        currentPower = powerStatus.value / 10;
      }
    } catch (err) {
      console.log('Using default power for stats');
    }
    
    const electricityRate = 9.43;
    
    // Get today's data
    const todayData = await getTodayHourlyData();
    const totalEnergyToday = todayData.reduce((sum, item) => sum + parseFloat(item.energy), 0);
    const costToday = totalEnergyToday * electricityRate;
    
    // Calculate for period
    let days = 1;
    if (period === 'week') days = 7;
    else if (period === 'month') days = 30;
    
    const periodData = await getHistoricalData(days);
    const totalEnergyPeriod = periodData.reduce((sum, item) => sum + parseFloat(item.energy), 0);
    const costPeriod = totalEnergyPeriod * electricityRate;
    
    // Calculate avg/peak from PERIOD data (not just today)
    const periodPowerValues = periodData.map(item => parseFloat(item.power));
    const avgPowerPeriod = periodPowerValues.length > 0 
      ? periodPowerValues.reduce((sum, p) => sum + p, 0) / periodPowerValues.length 
      : currentPower;
    const peakPowerPeriod = periodPowerValues.length > 0 
      ? Math.max(...periodPowerValues, currentPower)
      : currentPower;
    
    return {
      peakUsage: peakPowerPeriod.toFixed(2) + 'W',
      averageUsage: avgPowerPeriod.toFixed(2) + 'W',
      totalEnergy: totalEnergyPeriod.toFixed(4) + ' kWh',
      totalCost: '৳' + costPeriod.toFixed(2),
      todaysCost: '৳' + costToday.toFixed(2),
      weeksCost: period === 'week' ? '৳' + costPeriod.toFixed(2) : '৳' + (costToday * 7).toFixed(2),
      hourlyData: todayData
    };
  } catch (error) {
    console.error('✗ Error getting summary stats:', error.message);
    throw error;
  }
}
