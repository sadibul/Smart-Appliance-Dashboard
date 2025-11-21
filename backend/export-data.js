// Export energy readings data to CSV and JSON files
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://sadib:sadib@cluster0.pkzbqpn.mongodb.net/energy-monitor?retryWrites=true&w=majority';

// Reading schema
const readingSchema = new mongoose.Schema({
  timestamp: Date,
  power: Number,
  energy: Number,
  hourlyCost: Number,
  deviceId: String
}, { timestamps: true });

const EnergyReading = mongoose.model('EnergyReading', readingSchema);

async function exportData() {
  try {
    console.log('📊 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Fetch all readings
    const readings = await EnergyReading.find()
      .sort({ timestamp: -1 })
      .lean();

    console.log(`✓ Found ${readings.length} readings\n`);

    if (readings.length === 0) {
      console.log('⚠ No data found. Please collect data first.');
      process.exit(0);
    }

    // Export to CSV
    const csvHeader = 'No,Timestamp,Date,Time,Power (W),Energy (kWh),Hourly Cost (৳)\n';
    const csvRows = readings.map((r, index) => {
      const date = new Date(r.timestamp);
      const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour12: false });
      return `${index + 1},${r.timestamp},${dateStr},${timeStr},${r.power},${r.energy},${r.hourlyCost}`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;
    const csvPath = path.join(__dirname, 'ENERGY_DATA.csv');
    fs.writeFileSync(csvPath, csvContent);
    console.log(`✓ CSV exported: ${csvPath}`);

    // Export to JSON (formatted)
    const jsonPath = path.join(__dirname, 'ENERGY_DATA.json');
    fs.writeFileSync(jsonPath, JSON.stringify(readings, null, 2));
    console.log(`✓ JSON exported: ${jsonPath}`);

    // Create a simple text table
    const tableHeader = `
╔════╦═══════════════════════╦═════════════╦═══════════════╦══════════════╗
║ No ║      Timestamp        ║  Power (W)  ║  Energy (kWh) ║  Cost (৳/hr) ║
╠════╬═══════════════════════╬═════════════╬═══════════════╬══════════════╣
`;
    const tableRows = readings.slice(0, 50).map((r, index) => {
      const date = new Date(r.timestamp);
      const dateStr = date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      return `║ ${String(index + 1).padStart(2)} ║ ${dateStr.padEnd(21)} ║ ${String(r.power).padEnd(11)} ║ ${String(r.energy).padEnd(13)} ║ ${String(r.hourlyCost).padEnd(12)} ║`;
    }).join('\n');
    const tableFooter = `\n╚════╩═══════════════════════╩═════════════╩═══════════════╩══════════════╝`;
    
    const tableContent = tableHeader + tableRows + tableFooter + `\n\nTotal Readings: ${readings.length}\n`;
    const tablePath = path.join(__dirname, 'ENERGY_DATA_TABLE.txt');
    fs.writeFileSync(tablePath, tableContent);
    console.log(`✓ Table exported: ${tablePath}`);

    // Statistics
    const avgPower = (readings.reduce((sum, r) => sum + r.power, 0) / readings.length).toFixed(2);
    const maxPower = Math.max(...readings.map(r => r.power));
    const minPower = Math.min(...readings.map(r => r.power));
    const totalEnergy = readings[0].energy; // Latest total energy
    const totalCost = readings.reduce((sum, r) => sum + r.hourlyCost, 0).toFixed(2);

    const statsContent = `
📊 ENERGY MONITORING STATISTICS
═══════════════════════════════════════════════════════════

Total Readings Collected: ${readings.length}
Collection Period: ${new Date(readings[readings.length - 1].timestamp).toLocaleString()} 
               to ${new Date(readings[0].timestamp).toLocaleString()}

POWER CONSUMPTION:
  • Average Power: ${avgPower} W
  • Maximum Power: ${maxPower} W
  • Minimum Power: ${minPower} W

ENERGY & COST:
  • Total Energy Consumed: ${totalEnergy} kWh
  • Total Cost: ৳${totalCost}
  • Electricity Rate: ৳9.43/kWh

DEVICE INFORMATION:
  • Device ID: ${readings[0].deviceId}
  • Smart Plug: Tuya WiFi Smart Plug
  • Location: Bangladesh

═══════════════════════════════════════════════════════════
`;

    const statsPath = path.join(__dirname, 'ENERGY_STATISTICS.txt');
    fs.writeFileSync(statsPath, statsContent);
    console.log(`✓ Statistics exported: ${statsPath}\n`);

    console.log('═══════════════════════════════════════════════════════════');
    console.log(statsContent);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('\n✅ All data exported successfully!');
    console.log('\nFiles created:');
    console.log('  • ENERGY_DATA.csv          - Spreadsheet format');
    console.log('  • ENERGY_DATA.json         - JSON format');
    console.log('  • ENERGY_DATA_TABLE.txt    - Text table (first 50 rows)');
    console.log('  • ENERGY_STATISTICS.txt    - Summary statistics');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

exportData();
