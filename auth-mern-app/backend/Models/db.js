const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

connectDb();
