# Smart Energy Monitor Backend API

Backend server for the Tuya Smart Plug Energy Monitoring Dashboard. Built with Node.js and Express.

## 🚀 Features

- **Tuya Cloud Integration**: Full integration with Tuya Cloud OpenAPI
- **Real-time Metrics**: Live power, voltage, current, and energy monitoring
- **Device Control**: Turn smart plug on/off remotely
- **Energy History**: Historical energy consumption data
- **Statistics**: Daily, weekly, and monthly energy statistics
- **Automatic Token Refresh**: Handles Tuya access token lifecycle

## 📋 Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Active Tuya Cloud account with API credentials

## 🔧 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration

The Tuya API credentials are already configured in `api/tuya-auth.js`:

```javascript
const TUYA_CONFIG = {
  clientId: '9weeaxgxgytcmpyca8er',
  clientSecret: '49d590d2e65d4d128d694c9794e55d8e',
  baseUrl: 'https://openapi.tuyaeu.com',
  deviceId: 'bf5b8d9c7f3f2daa3f09du'
};
```

## 🏃 Running Locally

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Initialize Connection
```
GET /api/init
```
Initializes connection to Tuya Cloud and obtains access token.

### Get Live Metrics
```
GET /api/live
```
Returns real-time power, voltage, current, energy, and cost data.

**Response:**
```json
{
  "success": true,
  "data": {
    "power": "152.20",
    "voltage": "220.50",
    "current": "690",
    "totalEnergy": "0.1815",
    "hourlyCost": "1.435",
    "dailyProjection": "34.44",
    "switchState": true,
    "timestamp": "2025-11-20T12:00:00.000Z"
  }
}
```

### Control Device
```
POST /api/control
Content-Type: application/json

{
  "command": "on" // or "off"
}
```

### Get Today's Energy Data
```
GET /api/energy/today
```
Returns hourly energy consumption for today.

### Get Historical Data
```
GET /api/energy/history?days=7
```
Returns historical energy data (default: last 7 days).

### Get Summary Statistics
```
GET /api/energy/stats
```
Returns comprehensive energy statistics and insights.

## 🌐 Deployment

### Deploy to Render

1. Create account at [render.com](https://render.com)

2. Click "New +" → "Web Service"

3. Connect your GitHub repository

4. Configure:
   - **Name**: `smart-energy-monitor-api`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. Click "Create Web Service"

6. Your API will be live at: `https://smart-energy-monitor-api.onrender.com`

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`

5. Your API will be deployed automatically

6. Copy the generated URL (e.g., `https://your-app.up.railway.app`)

### Deploy to Vercel

1. Create account at [vercel.com](https://vercel.com)

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Navigate to backend directory and deploy:
```bash
cd backend
vercel
```

4. Follow the prompts

5. Your API will be live at the provided URL

## 🔒 Security Notes

- The API credentials are hardcoded for your specific project
- For production, consider using environment variables
- Enable CORS only for your frontend domain
- Implement rate limiting for production use

## 🐛 Troubleshooting

### Token Errors
If you see authentication errors, the token cache will automatically refresh. Wait a few seconds and retry.

### Connection Issues
Ensure your Tuya credentials are correct and the device is online in the Tuya app.

### CORS Errors
The server has CORS enabled for all origins. Update `server.js` if you need to restrict access:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 📝 Dependencies

- **express**: Web server framework
- **cors**: Cross-origin resource sharing
- **axios**: HTTP client for Tuya API
- **crypto**: HMAC signature generation

## 📄 License

MIT
