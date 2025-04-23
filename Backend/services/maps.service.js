const axios = require("axios");
const captainModel = require("../models/captain.model");
module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates for the given address.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No route found for the given locations");
      }

      return data.rows[0].elements[0];
    } else {
      throw new Error(
        "Unable to fetch distance and time for the given locations."
      );
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async(input) => {
  if(!input){
    throw new Error('Input is required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      return data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions for the given input.");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  // radius in km


  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });

  return captains;


}
