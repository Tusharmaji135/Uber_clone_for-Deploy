const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];



    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const blacklisted = await BlacklistToken.findOne({ token });

    if (blacklisted) {
      return res.status(403).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = decoded;

    return next();
  } catch (err) {
    console.error("authCaptain error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
