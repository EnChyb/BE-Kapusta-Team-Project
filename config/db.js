const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
