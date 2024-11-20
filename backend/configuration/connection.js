const mongoose = require("mongoose");

const URI = "mongodb+srv://arisamasalidhs:arisamasalidhs@cluster01.tecml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI); // No need for useNewUrlParser or useUnifiedTopology
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection error: ", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
