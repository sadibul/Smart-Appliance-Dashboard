const { TUYA_CONFIG, makeAuthenticatedRequest } = require('./tuya-auth');

/**
 * Get current device status and electrical parameters
 */
async function getDeviceStatus() {
  try {
    const path = `/v1.0/iot-03/devices/${TUYA_CONFIG.deviceId}/status`;
    const status = await makeAuthenticatedRequest('GET', path);
    
    // Parse the status array into a more usable object
    const statusObj = {};
    status.forEach(item => {
      statusObj[item.code] = item.value;
    });
    
    return statusObj;
  } catch (error) {
    console.error('✗ Error getting device status:', error.message);
    throw error;
  }
}

/**
 * Get detailed device information
 */
async function getDeviceInfo() {
  try {
    const path = `/v1.0/iot-03/devices/${TUYA_CONFIG.deviceId}`;
    const deviceInfo = await makeAuthenticatedRequest('GET', path);
    return deviceInfo;
  } catch (error) {
    console.error('✗ Error getting device info:', error.message);
    throw error;
  }
}

/**
 * Calculate live metrics from device status
 */
async function getLiveMetrics() {
  try {
    const status = await getDeviceStatus();
    
    // Extract electrical parameters
    // cur_power: current power in 0.1W (divide by 10 for watts)
    // cur_voltage: voltage in 0.1V (divide by 10 for volts)
    // cur_current: current in mA
    const power = (status.cur_power || 0) / 10; // Watts
    const voltage = (status.cur_voltage || 0) / 10; // Volts
    const current = (status.cur_current || 0); // mA
    const switchState = status.switch_1 || false;

    // Calculate today's energy consumption (estimate based on current hour)
    const now = new Date();
    const currentHour = now.getHours() + (now.getMinutes() / 60); // Include partial hour
    const todayEnergy = (power / 1000) * currentHour; // kWh consumed today

    // Electricity rate from environment (fallback 9.43 BDT/kWh)
    const electricityRate = parseFloat(process.env.ELECTRICITY_RATE || '9.43');
    const hourlyCost = (power / 1000) * electricityRate; // Cost per hour
    const dailyProjection = hourlyCost * 24; // Daily projection
    
    return {
      power: power.toFixed(2),
      voltage: voltage.toFixed(2),
      current: current.toFixed(0),
      totalEnergy: todayEnergy.toFixed(4),
      hourlyCost: hourlyCost.toFixed(3),
      dailyProjection: dailyProjection.toFixed(2),
      switchState: switchState,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('✗ Error getting live metrics:', error.message);
    throw error;
  }
}

module.exports = {
  getDeviceStatus,
  getDeviceInfo,
  getLiveMetrics
};
