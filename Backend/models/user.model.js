// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false, // Excludes password from queries by default
  },
  socketId: {
    type: String, // Optional: used for real-time communication (e.g., with Socket.io)
  },
});

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  // Create a token with the user ID as payload and secret from env variable
  const token = jwt.sign(
    {
      _id: this._id,
      
    },
    process.env.JWT_SECRET, // Keep this safe in your .env file
    {
      expiresIn: "24hr", // Token expiration time
    }
  );
  return token;
};

// Instance method to compare a plain password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to hash a password before saving it to the database
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // 10 is the salt rounds
};

// Create and export the Mongoose model based on the schema
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
