# Smart Appliance Dashboard - Deployment Guide

## ✅ Automated Setup Completed

The following has been done automatically:
- ✅ Backend `.env` created with your Tuya credentials
- ✅ `.gitignore` configured to protect secrets
- ✅ Frontend API config added for deployment flexibility
- ✅ Environment variables tested and working

## 🚀 Deployment Steps (You Need To Do These)

### Step 1: Push Code to GitHub

```bash
cd "/Users/sadib/Documents/CSE 407 Midterm project /My Work"

# Initialize git (if not already done)
git init

# Add all files (.env will be ignored automatically)
git add .

# Commit
git commit -m "Smart Appliance Dashboard - Complete Project"

# Set main branch
git branch -M main

# Add your GitHub repo (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/smart-appliance-dashboard.git

# Push
git push -u origin main
```

**IMPORTANT:** Replace `YOUR_USERNAME` with your actual GitHub username. Create the repository on GitHub first if you haven't already.

---

### Step 2: Deploy Backend to Render

1. **Go to:** https://render.com
2. **Sign up/Login** (use GitHub account for easy connection)
3. **Click:** "New +" → "Web Service"
4. **Connect** your GitHub repository
5. **Configure:**
   - **Name:** `smart-backend` (or any name)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free

6. **Add Environment Variables** (click "Add Environment Variable" for each):
   ```
   TUYA_CLIENT_ID = 9weeaxgxgytcmpyca8er
   TUYA_CLIENT_SECRET = 49d590d2e65d4d128d694c9794e55d8e
   TUYA_DEVICE_ID = bf5b8d9c7f3f2daa3f09du
   TUYA_BASE_URL = https://openapi.tuyaeu.com
   MONGODB_URI = mongodb+srv://sadib:sadib@cluster0.pkzbqpn.mongodb.net/energy-monitor?retryWrites=true&w=majority
   ELECTRICITY_RATE = 9.43
   ```

7. **Click:** "Create Web Service"
8. **Wait** for deployment (3-5 minutes)
9. **Copy** your backend URL (e.g., `https://smart-backend.onrender.com`)

---

### Step 3: Test Backend

```bash
# Replace with your actual Render URL
curl -s https://YOUR-BACKEND.onrender.com/health

# Test live data
curl -s https://YOUR-BACKEND.onrender.com/api/live

# Test control
curl -X POST -H "Content-Type: application/json" \
  -d '{"command":"off"}' \
  https://YOUR-BACKEND.onrender.com/api/control
```

---

### Step 4: Update Frontend for Deployment

Open `frontend/api-config.js` and update line 4:

```javascript
window.API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://YOUR-BACKEND.onrender.com'; // Replace with your actual backend URL
```

**Save the file** after updating.

---

### Step 5: Deploy Frontend to Netlify

1. **Go to:** https://app.netlify.com
2. **Sign up/Login**
3. **Click:** "Add new site" → "Deploy manually"
4. **Drag and drop** the entire `frontend` folder (not "My Work", just the frontend folder)
5. **Wait** for deployment (30 seconds)
6. **Copy** your dashboard URL (e.g., `https://smart-dashboard.netlify.app`)

---

### Step 6: Test Complete System

1. **Open** your Netlify dashboard URL in browser
2. **Verify:**
   - ✅ Live power reading shows
   - ✅ Charts update every 5 seconds
   - ✅ ON/OFF button works
   - ✅ Device actually turns on/off
   - ✅ MongoDB Atlas shows new readings

---

## 📱 For Presentation

### URLs You'll Use:
- **Dashboard:** `https://your-dashboard.netlify.app`
- **Backend API:** `https://your-backend.onrender.com`

### What To Show:
1. Live dashboard with real-time data
2. Control device remotely (ON/OFF)
3. MongoDB Atlas → Browse Collections → energy readings
4. Exported CSV files (ENERGY_DATA.csv, etc.)

### Commands for Demo:
```bash
# Check backend health
curl https://your-backend.onrender.com/health

# Get live data
curl https://your-backend.onrender.com/api/live

# Turn device off
curl -X POST -H "Content-Type: application/json" \
  -d '{"command":"off"}' \
  https://your-backend.onrender.com/api/control

# Turn device on
curl -X POST -H "Content-Type: application/json" \
  -d '{"command":"on"}' \
  https://your-backend.onrender.com/api/control
```

---

## 🔧 Local Development

### Start Everything:
```bash
cd "/Users/sadib/Documents/CSE 407 Midterm project /My Work"
./start.sh
```

### Stop Everything:
```bash
./stop.sh
```

### Access Locally:
- Dashboard: http://localhost:8080/dashboard-final.html
- Backend API: http://localhost:3000/api/live

---

## 🛡️ Security Notes

- ✅ `.env` file is git-ignored (secrets safe)
- ✅ Environment variables used on Render (not in code)
- ⚠️ MongoDB Atlas set to allow all IPs (0.0.0.0/0) - consider restricting after testing
- ⚠️ No authentication on /api/control - add if needed for production

---

## 📊 Exported Data Files

Located in `Data Files/` folder:
- `ENERGY_DATA.csv` - First device readings (29.5W)
- `ENERGY_DATA2.csv` - Fan readings (11W)
- `ENERGY_DATA3.csv` - Mobile charging readings (32.9W)

Use these in your report/presentation.

---

## 🚨 Troubleshooting

### Backend Issues:
- **401 Error:** Check Tuya credentials in Render environment variables
- **MongoDB Error:** Verify connection string and network access in Atlas
- **Port Already in Use:** Run `./stop.sh` first

### Frontend Issues:
- **No Data Showing:** Check `api-config.js` has correct backend URL
- **CORS Error:** Already handled with `cors()` in backend
- **Charts Empty:** Refresh page, wait 5-10 seconds for initial data

### Device Control Not Working:
- Verify device is online in Tuya app
- Check backend logs in Render dashboard
- Test API directly with curl commands above

---

## ✅ Deployment Checklist

Before presenting:
- [ ] Backend deployed and responding to `/health`
- [ ] Frontend deployed and shows live data
- [ ] Device control (ON/OFF) works remotely
- [ ] MongoDB Atlas shows new readings
- [ ] CSV files ready for demonstration
- [ ] URLs bookmarked for quick access
- [ ] Backup: Local version ready (`./start.sh`)

---

## 📞 Quick Reference

**Your Credentials:**
- Tuya Client ID: `9weeaxgxgytcmpyca8er`
- Tuya Device ID: `bf5b8d9c7f3f2daa3f09du`
- MongoDB Cluster: `cluster0.pkzbqpn.mongodb.net`
- Electricity Rate: `৳9.43/kWh`

**Backend Environment Variables:**
```
TUYA_CLIENT_ID=9weeaxgxgytcmpyca8er
TUYA_CLIENT_SECRET=49d590d2e65d4d128d694c9794e55d8e
TUYA_DEVICE_ID=bf5b8d9c7f3f2daa3f09du
TUYA_BASE_URL=https://openapi.tuyaeu.com
MONGODB_URI=mongodb+srv://sadib:sadib@cluster0.pkzbqpn.mongodb.net/energy-monitor?retryWrites=true&w=majority
ELECTRICITY_RATE=9.43
```

---

**Good luck with your presentation! 🎉**
