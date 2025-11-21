// API Configuration
// When running locally: uses localhost:3000
// When deployed: set this to your deployed backend URL (e.g., https://smart-backend.onrender.com)
// Auto-detect API base URL based on environment
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.API_BASE_URL = isLocalhost 
    ? 'http://localhost:3000'
    : 'https://smart-appliance-dashboard.onrender.com'; // ✅ Updated with actual Render URL

console.log('API Base URL:', window.API_BASE_URL);
