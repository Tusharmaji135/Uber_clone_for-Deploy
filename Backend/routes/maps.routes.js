const express = require("express");
const router = express.Router();
const mapController = require("../controllers/map.controller.js");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().withMessage("Address must be a string"),
  query("address")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 5 characters long"),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get('/get-distance-time',
  query('origin').isString().withMessage('Origin must be a string'),
  query('destination').isString().withMessage('Destination must be a string'),
  authMiddleware.authUser,
  mapController.getDistanceTime
)

router.get('/get-suggestions',
  query('input').isString().withMessage('Input must be a string'),
  authMiddleware.authUser,
  mapController.getSuggestions
)
module.exports = router;
