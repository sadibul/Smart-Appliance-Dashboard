// API Configuration
// When running locally: uses localhost:3000
// When deployed: set this to your deployed backend URL (e.g., https://smart-backend.onrender.com)
window.API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://smart-backend.onrender.com'; // Change this after deploying backend

console.log('API Base URL:', window.API_BASE_URL);
