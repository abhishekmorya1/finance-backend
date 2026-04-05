const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection successful, print host name
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    // If any error occurs, print error message
    console.error(error.message);

    // Exit process with failure
    process.exit(1);
  }
};

// Export the function
module.exports = connectDB;