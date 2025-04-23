const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

// Controller to handle user registration
module.exports.registerUser = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }

  const { fullname, email, password } = req.body;

  // Check if user with the given email already exists
  const isUserAlready = await userModel.findOne({ email });

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the user's password before saving
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user using the userService
  const user = await userService.createUser({
    firstname: fullname.firstname,  // Assuming fullname is an object with firstname and lastname
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  // Generate a JWT token for the new user
  const token = user.generateAuthToken();

  // Send response with token and user data
  res.status(201).json({ token, user });
};

// Controller to handle user login
module.exports.loginUser = async (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }

  const { email, password } = req.body;

  // Find user by email and include password in the result
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the entered password with the stored hashed password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate a new JWT token
  const token = user.generateAuthToken();

  // Set the token as a cookie in the response
  res.cookie("token", token);

  // Send response with token and user data
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async(req,res,next)=>{
  res.status(200).json({user:req.user})
}

module.exports.logoutUser = async(req,res,next)=>{
  res.clearCookie("token"); // Clear the token cookie
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokenModel.create({token}) // Add the token to the blacklist

  res.status(200).json({message:"Logged out successfully"})
}