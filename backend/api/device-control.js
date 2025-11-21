const { TUYA_CONFIG, makeAuthenticatedRequest } = require('./tuya-auth');

/**
 * Control device switch (turn on/off)
 */
async function controlDevice(command) {
  try {
    const path = `/v1.0/iot-03/devices/${TUYA_CONFIG.deviceId}/commands`;
    
    const body = {
      commands: [
        {
          code: 'switch_1',
          value: command === 'on' ? true : false
        }
      ]
    };
    
    const result = await makeAuthenticatedRequest('POST', path, body);
    console.log(`✓ Device turned ${command.toUpperCase()}`);
    return result;
  } catch (error) {
    console.error('✗ Error controlling device:', error.message);
    throw error;
  }
}

/**
 * Get device switch state
 */
async function getDeviceSwitchState() {
  try {
    const path = `/v1.0/iot-03/devices/${TUYA_CONFIG.deviceId}/status`;
    const status = await makeAuthenticatedRequest('GET', path);
    
    const switchStatus = status.find(item => item.code === 'switch_1');
    return switchStatus ? switchStatus.value : false;
  } catch (error) {
    console.error('✗ Error getting switch state:', error.message);
    throw error;
  }
}

module.exports = {
  controlDevice,
  getDeviceSwitchState
};
