const crypto = require('crypto');
const axios = require('axios');

// Load environment variables (if dotenv is initialized in server.js)
// Tuya API Credentials now sourced from environment for security.
const TUYA_CONFIG = {
  clientId: process.env.TUYA_CLIENT_ID || '',
  clientSecret: process.env.TUYA_CLIENT_SECRET || '',
  baseUrl: process.env.TUYA_BASE_URL || 'https://openapi.tuyaeu.com',
  deviceId: process.env.TUYA_DEVICE_ID || ''
};

if (!TUYA_CONFIG.clientId || !TUYA_CONFIG.clientSecret || !TUYA_CONFIG.deviceId) {
  console.warn('⚠ Tuya credentials missing (TUYA_CLIENT_ID / TUYA_CLIENT_SECRET / TUYA_DEVICE_ID). Set them in environment before deploying.');
}

// Token cache
let tokenCache = {
  token: null,
  expiresAt: 0
};

/**
 * Generate HMAC SHA-256 signature for Tuya API (v2 format)
 * Concatenation order: clientId + accessToken(optional) + t + nonce + stringToSign
 */
function generateSignature(clientId, secret, t, nonce, stringToSign, accessToken = '') {
  const str = clientId + accessToken + t + nonce + stringToSign;
  const hash = crypto.createHmac('sha256', secret).update(str).digest('hex');
  return hash.toUpperCase();
}

/**
 * Get access token from Tuya API with caching
 * Implements proper Tuya signature construction.
 */
async function getAccessToken(forceRefresh = false) {
  if (!forceRefresh && tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }
  try {
    const t = Date.now().toString();
    const nonce = '';
    // Path including query per Tuya spec
    const path = '/v1.0/token?grant_type=1';
    // String to sign: METHOD + "\n" + SHA256(body) + "\n" + "\n" + path
    const bodyHash = crypto.createHash('sha256').update('').digest('hex');
    const stringToSign = `GET\n${bodyHash}\n\n${path}`;
    const sign = generateSignature(
      TUYA_CONFIG.clientId,
      TUYA_CONFIG.clientSecret,
      t,
      nonce,
      stringToSign
    );
    const response = await axios.get(`${TUYA_CONFIG.baseUrl}${path}`, {
      headers: {
        'client_id': TUYA_CONFIG.clientId,
        'sign': sign,
        't': t,
        'sign_method': 'HMAC-SHA256',
        'nonce': nonce
      }
    });
    if (response.data.success) {
      tokenCache.token = response.data.result.access_token;
      tokenCache.expiresAt = Date.now() + (response.data.result.expire_time - 300) * 1000;
      console.log('✓ Tuya access token obtained successfully');
      return tokenCache.token;
    }
    throw new Error('Failed to get access token: ' + JSON.stringify(response.data));
  } catch (error) {
    console.error('✗ Error getting access token:', error.message);
    throw error;
  }
}

/**
 * Make authenticated request to Tuya API
 */
async function makeAuthenticatedRequest(method, path, body = null) {
  try {
    const token = await getAccessToken();
    const t = Date.now().toString();
    const nonce = '';
    
    let signStr = '';
    let bodyStr = '';
    
    if (body && method !== 'GET') {
      bodyStr = JSON.stringify(body);
      signStr = bodyStr;
    }

    const stringToSign = method + '\n' +
      crypto.createHash('sha256').update(bodyStr).digest('hex') + '\n' +
      '\n' +
      path;

    const sign = generateSignature(
      TUYA_CONFIG.clientId,
      TUYA_CONFIG.clientSecret,
      t,
      nonce,
      stringToSign,
      token
    );

    const headers = {
      'client_id': TUYA_CONFIG.clientId,
      'access_token': token,
      'sign': sign,
      't': t,
      'sign_method': 'HMAC-SHA256',
      'nonce': nonce,
      'Content-Type': 'application/json'
    };

    const config = {
      method: method.toLowerCase(),
      url: `${TUYA_CONFIG.baseUrl}${path}`,
      headers: headers
    };

    if (body && method !== 'GET') {
      config.data = body;
    }

    const response = await axios(config);
    
    if (response.data.success) {
      return response.data.result;
    } else {
      throw new Error(`API Error: ${response.data.msg || 'Unknown error'}`);
    }
  } catch (error) {
    console.error(`✗ Error making ${method} request to ${path}:`, error.message);
    throw error;
  }
}

module.exports = {
  TUYA_CONFIG,
  getAccessToken,
  makeAuthenticatedRequest
};
