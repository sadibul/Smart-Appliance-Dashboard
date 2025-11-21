// Export last 100 energy readings to ENERGY_DATA3.csv
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb+srv://sadib:sadib@cluster0.pkzbqpn.mongodb.net/energy-monitor?retryWrites=true&w=majority';

const readingSchema = new mongoose.Schema({
  timestamp: Date,
  power: Number,
  energy: Number,
  hourlyCost: Number,
  deviceId: String
}, { timestamps: true });

const EnergyReading = mongoose.model('EnergyReading', readingSchema);

async function exportData3() {
  try {
    await mongoose.connect(MONGODB_URI);
    const readings = await EnergyReading.find().sort({ timestamp: -1 }).limit(100).lean();
    if (readings.length === 0) {
      console.log('No data found.');
      process.exit(0);
    }
    const csvHeader = 'No,Timestamp,Date,Time,Power (W),Energy (kWh),Hourly Cost (৳)\n';
    const csvRows = readings.map((r, index) => {
      const date = new Date(r.timestamp);
      const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour12: false });
      return `${index + 1},${r.timestamp},${dateStr},${timeStr},${r.power},${r.energy},${r.hourlyCost}`;
    }).join('\n');
    const csvContent = csvHeader + csvRows;
    const csvPath = path.join(__dirname, '../ENERGY_DATA3.csv');
    fs.writeFileSync(csvPath, csvContent);
    console.log(`✓ ENERGY_DATA3.csv exported: ${csvPath}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

exportData3();
