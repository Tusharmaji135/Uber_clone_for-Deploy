const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');


module.exports.getCoordinates = async (req,res,next) => {
    // Validate the request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the address from the request query
  const { address } = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json( coordinates );
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getDistanceTime = async(req,res,next)=>{
    try {
        // Validate the request parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract the origin and destination from the request query
        const { origin, destination } = req.query;

        // Call the service to get distance and time
        const distanceTime = await mapsService.getDistanceTime(origin, destination);

        // Send the response
        res.status(200).json(distanceTime);
        
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        res.status(500).json({ error: 'Internal server error' });
        
    }
  
}

module.exports.getSuggestions = async (req, res, next) => {
  try {
    // Validate the request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the input from the request query
    const { input } = req.query;

    // Call the service to get suggestions
    const suggestions = await mapsService.getAutoCompleteSuggestions(input);

    // Send the response
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};