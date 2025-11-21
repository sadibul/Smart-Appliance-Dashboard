const EnergyReading = require('../models/EnergyReading');

// Maximum number of records to keep
const MAX_RECORDS = 150;

/**
 * Save energy reading to database and maintain max records
 */
async function saveEnergyReading(power, energy, hourlyCost) {
  try {
    // Create new reading
    const reading = new EnergyReading({
      timestamp: new Date(),
      power: parseFloat(power),
      energy: parseFloat(energy),
      hourlyCost: parseFloat(hourlyCost)
    });

    await reading.save();
    console.log(`✓ Saved reading: ${power}W, ${energy}kWh, ৳${hourlyCost}/hr`);

    // Keep only last MAX_RECORDS (delete older ones)
    const count = await EnergyReading.countDocuments();
    if (count > MAX_RECORDS) {
      const toDelete = count - MAX_RECORDS;
      const oldestReadings = await EnergyReading.find()
        .sort({ timestamp: 1 })
        .limit(toDelete)
        .select('_id');
      
      const idsToDelete = oldestReadings.map(r => r._id);
      await EnergyReading.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`✓ Cleaned up ${toDelete} old records`);
    }

    return reading;
  } catch (error) {
    console.error('✗ Error saving reading:', error.message);
    return null;
  }
}

/**
 * Get all stored readings
 */
async function getAllReadings(limit = MAX_RECORDS) {
  try {
    const readings = await EnergyReading.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    return readings;
  } catch (error) {
    console.error('✗ Error fetching readings:', error.message);
    return [];
  }
}

/**
 * Get readings count
 */
async function getReadingsCount() {
  try {
    return await EnergyReading.countDocuments();
  } catch (error) {
    return 0;
  }
}

/**
 * Clear all readings
 */
async function clearAllReadings() {
  try {
    const result = await EnergyReading.deleteMany({});
    console.log(`✓ Cleared ${result.deletedCount} readings`);
    return result.deletedCount;
  } catch (error) {
    console.error('✗ Error clearing readings:', error.message);
    return 0;
  }
}

module.exports = {
  saveEnergyReading,
  getAllReadings,
  getReadingsCount,
  clearAllReadings
};
