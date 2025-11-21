const mongoose = require('mongoose');

// MongoDB Atlas Connection String
// Replace with your MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://sadib:sadib@cluster0.pkzbqpn.mongodb.net/energy-monitor?retryWrites=true&w=majority';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    console.log('✓ Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✓ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    console.log('⚠ Dashboard will work without database (data not saved)');
    // Don't throw error - let app continue without database
  }
}

module.exports = { connectToDatabase, isConnected: () => isConnected };
