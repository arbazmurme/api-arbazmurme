const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb+srv://arbazmurme:arbazmurme@arbazmurme.zup85.mongodb.net/portfolio?appName=arbazmurme";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || DEFAULT_MONGO_URI;
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
