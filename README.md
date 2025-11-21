
# Smart Energy Monitor Dashboard

Modern, real-time energy monitoring for Tuya Smart Plugs. Beautiful UI, live metrics, charts, and device control.

**🆕 Now with MongoDB Atlas integration for automatic data storage!**

## 🚀 Quick Start

1. **Install Backend**
   ```bash
   cd backend
   npm install
   npm start
   # Runs at http://localhost:3000
   ```
2. **Serve Frontend**
   ```bash
   cd frontend
   python3 -m http.server 8080
   # Or use npx http-server -p 8080
   # Or VS Code Live Server
   ```
3. **Open Dashboard**
   - Go to [http://localhost:8080](http://localhost:8080)

## 💡 Features

- Real-time power, voltage, current, and energy readings
- Interactive charts (power draw, energy trend, usage patterns)
- Device ON/OFF control
- Cost tracking and projections
- Data export (CSV, JSON)
- **Automatic data storage to MongoDB Atlas cloud database**
- Responsive, modern UI

## 🗂️ Project Structure

```
My Work/
├── backend/
│   ├── api/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── dashboard.html
│   ├── styles.css
│   ├── script.js
│   ├── charts.js
│   └── ...
└── README.md
```

## ⚙️ Configuration

- **API URL:** Edit `frontend/api.js` if deploying backend elsewhere:
  ```js
  const API_BASE_URL = 'http://localhost:3000/api';
  ```
- **Electricity Rate:** Edit `backend/api/live-metrics.js`:
  ```js
  const electricityRate = 9.43; // BDT per kWh
  ```

## 💾 Database Setup (Optional)

To enable automatic data storage to MongoDB Atlas:

**See complete guide**: `MONGODB_SETUP.md` or `QUICK_MONGODB_GUIDE.md`

**Quick setup** (5 minutes):
1. Create free account at mongodb.com/atlas
2. Get connection string
3. Update `backend/config/database.js` line 5
4. Restart backend

**Note**: Dashboard works perfectly without database! Data storage is optional.

## 📄 License

MIT License

**Built for CSE 407 Midterm Project**
#### Option 3: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to backend: `cd backend`
3. Deploy: `vercel`
4. Follow prompts
5. Copy the deployment URL

### Frontend Deployment

#### Option 1: Netlify (Recommended)

1. Visit [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `frontend` folder to Netlify
3. **IMPORTANT**: Update `api.js` with your backend URL:

```javascript
// In frontend/api.js, change:
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

4. Re-deploy the updated frontend
5. Your dashboard will be live at: `https://your-app.netlify.app`

#### Option 2: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend: `cd frontend`
3. Update `api.js` with backend URL
4. Deploy: `vercel`
5. Your site will be live

#### Option 3: GitHub Pages

1. Create a new repository on GitHub
2. Upload the `frontend` folder contents
3. Go to Settings → Pages
4. Select branch and save
5. Update `api.js` with backend URL
6. Your site will be at: `https://username.github.io/repo-name`

## 📱 Usage

### Login Page
- View device status
- Check connection to Tuya Cloud
- Enter dashboard

### Dashboard Features

1. **Control Panel**
   - Select device
   - Turn on/off smart plug
   - View electricity rate

2. **Live Metrics**
   - Current power draw (Watts)
   - Total energy consumed (kWh)
   - Hourly cost (৳/hr)
   - Daily projection (৳)

3. **Power Draw Chart**
   - Real-time power consumption graph
   - Updates every 5 seconds
   - 24-hour rolling window

4. **Energy Usage Trend**
   - Historical energy consumption
   - Bar chart by day
   - Last 7 days

5. **Statistics**
   - Efficiency score
   - Cost insights
   - Smart tips
   - Usage analysis

6. **Summary Table**
   - Peak usage
   - Average usage
   - Total energy & cost
   - Period selection (Today/Week/Month)

7. **Usage Patterns**
   - Average usage by hour
   - Peak hours identification

8. **Export Options**
   - Download as CSV
   - Download as JSON

## 🔧 Configuration

### Update API URL (After Deployment)

In `frontend/api.js`, update:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Change Electricity Rate

In `backend/api/live-metrics.js`, modify:

```javascript
const electricityRate = 9.43; // BDT per kWh
```

### Auto-refresh Interval

In `frontend/script.js`, adjust:

```javascript
refreshInterval = setInterval(refreshLiveMetrics, 5000); // 5 seconds
```

## 🎨 UI Customization

The project uses CSS custom properties for easy theming. Edit `frontend/styles.css`:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --accent: #a855f7;         /* Accent color */
    --success: #22c55e;        /* Success/positive */
    --bg-primary: #0f172a;     /* Main background */
    --bg-card: #1e293b;        /* Card background */
    /* ... more variables */
}
```

## 🔍 API Documentation

See `backend/README.md` for complete API documentation.

## 📊 Features in Detail

### Real-time Updates
- Dashboard refreshes every 5 seconds
- Live power readings from Tuya device
- Automatic chart updates

### Device Control
- Toggle smart plug on/off
- Visual feedback
- State persistence

### Charts (Chart.js)
- Power Draw: Line chart, 24-hour rolling
- Energy Trend: Bar chart, daily totals
- Usage Patterns: Average hourly consumption

### Data Export
- CSV: Comma-separated values for Excel
- JSON: Complete data structure

### Responsive Design
- Mobile-friendly
- Tablet optimized
- Desktop enhanced

## 🐛 Troubleshooting

### "Failed to connect" error
- Check if backend is running
- Verify backend URL in `api.js`
- Check CORS settings

### No data showing
- Ensure device is online in Tuya app
- Check browser console for errors
- Verify Tuya credentials

### Charts not displaying
- Check if Chart.js CDN is accessible
- Clear browser cache
- Check console for JavaScript errors

### Device control not working
- Verify device is online
- Check API response in Network tab
- Ensure device ID is correct

## 🔐 Security Best Practices

For production deployment:

1. **Use Environment Variables**
   - Move credentials to `.env` file
   - Never commit sensitive data

2. **Enable HTTPS**
   - Use SSL certificates
   - Enforce secure connections

3. **Restrict CORS**
   - Limit to specific domains
   - Remove wildcard access

4. **Rate Limiting**
   - Implement request throttling
   - Prevent abuse

5. **Authentication**
   - Add user login
   - Protect API endpoints

## 📦 Dependencies

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- axios: ^1.6.0
- crypto: ^1.0.1

### Frontend
- Chart.js: ^4.4.0 (CDN)
- Vanilla JavaScript (ES6+)
- Modern CSS (Grid, Flexbox)

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your needs.

## 📄 License

MIT License - Feel free to use and modify.

## 🎓 Project Info

- **Project**: CSE 407 Midterm Project
- **Energy Monitoring System**: Tuya Smart Plug Integration
- **Technologies**: Node.js, Express, Vanilla JavaScript, Chart.js
- **API**: Tuya Cloud OpenAPI (Central Europe)

## 📞 Support

For Tuya API issues:
- [Tuya Developer Documentation](https://developer.tuya.com)
- [Tuya API Explorer](https://openapi.tuyaeu.com)

## ✨ Acknowledgments

- Tuya Cloud OpenAPI for device integration
- Chart.js for beautiful visualizations
- Modern CSS techniques for responsive design

---

**Built with ⚡ for CSE 407 Midterm Project**
