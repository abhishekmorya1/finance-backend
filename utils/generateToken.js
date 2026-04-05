const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (id) => {
  // Check if JWT secret is present
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // Create and return token
  return jwt.sign(
    { id }, // payload (user id)
    process.env.JWT_SECRET, // secret key
    {
      expiresIn: "7d", // token expiry
    }
  );
};

module.exports = generateToken;