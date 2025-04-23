const Ride = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

// Get Fare Function with retry and error handling
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 1,
    car: 2,
    moto: 1.5,
  };

  const { distance, duration } = distanceTime;

  const distanceInKm = distance.value / 1000;
  const durationInMinutes = duration.value / 60;

  const fare = {
    auto: (
      baseFare.auto +
      distanceInKm * perKmRate.auto +
      durationInMinutes * perMinuteRate.auto
    ).toFixed(2),
    car: (
      baseFare.car +
      distanceInKm * perKmRate.car +
      durationInMinutes * perMinuteRate.car
    ).toFixed(2),
    moto: (
      baseFare.moto +
      distanceInKm * perKmRate.moto +
      durationInMinutes * perMinuteRate.moto
    ).toFixed(2),
  };

  return fare;
}

// Optional: Retry wrapper for getFare in case of flaky API
async function retryGetFare(pickup, destination, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await getFare(pickup, destination);
    } catch (err) {
      console.error(`Attempt ${i + 1} failed:`, err.message);
      if (i === attempts - 1) throw err;
    }
  }
}

// OTP Generator
function getOtp(num) {
  const otp = crypto
    .randomInt(0, Math.pow(10, num))
    .toString()
    .padStart(num, "0");
  return otp;
}

// Main function to create ride
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  let fare;
  try {
    fare = await retryGetFare(pickup, destination);
  } catch (error) {
    console.error("Fare calculation failed:", error.message);
    fare = {
      auto: null,
      car: null,
      moto: null,
    };
  }

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};


module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
      throw new Error('Ride id and OTP are required');
  }

  const ride = await Ride.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  // if (ride.status !== 'accepted') {
  //     throw new Error('Ride not accepted');
  // }

  if (ride.otp !== otp) {
      throw new Error('Invalid OTP');
  }

  await Ride.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'ongoing'
  })

  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await Ride.findOne({
      _id: rideId,
      captain: captain._id
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await Ride.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })

  return ride;
}


module.exports.getFare = getFare;
