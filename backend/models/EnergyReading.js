const mongoose = require('mongoose');

const energyReadingSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  power: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true
  },
  hourlyCost: {
    type: Number,
    required: true
  },
  deviceId: {
    type: String,
    required: true,
    default: 'bf5b8d9c7f3f2daa3f09du'
  }
}, {
  timestamps: true
});

// Index for faster queries
energyReadingSchema.index({ timestamp: -1 });

const EnergyReading = mongoose.model('EnergyReading', energyReadingSchema);

module.exports = EnergyReading;
