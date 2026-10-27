const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      // Short timeout so app doesn't hang if local mongodb service isn't running
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 2000
      });
      isConnected = true;
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    } catch (err) {
      console.warn(`[MongoDB] Notice: MongoDB connection failed (${err.message}). Seamlessly running in Persistent Storage Mode (Local FileDB).`);
      isConnected = false;
    }
  } else {
    console.log('[Database] Running in Persistent File Storage Mode.');
  }
};

const getDbStatus = () => ({
  mode: isConnected ? 'mongodb' : 'file-storage',
  isConnected
});

module.exports = { connectDB, getDbStatus };
