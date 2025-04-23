const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const ridesRoutes = require("./routes/ride.routes");

const app = express();

// Connect to MongoDB
connectToDb();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://uber-clone-for-deploy.vercel.app"
];

// Enable CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API Routes
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", ridesRoutes);

module.exports = app;
