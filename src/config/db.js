require('dotenv').config();
const mongoose = require("mongoose");

const uri = process.env.DATABASE_URL;

async function connectMongoose() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error("Connection to MongoDB error:", e.message);
    process.exit(1);
  }
}

connectMongoose();
