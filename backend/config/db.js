const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    // Temporary fix for local DNS SRV resolution issue
    if (process.env.NODE_ENV === "development") {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;