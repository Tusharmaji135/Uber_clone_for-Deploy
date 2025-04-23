import React from "react";
import '../LookingForDriver.css'; // Import the CSS file

function LookingForDriver(props) {
  // Set the image URL based on the vehicle type
  let vehicleImage;
  if (props.vehicleType === "car") {
    vehicleImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"; // Car image
  } else if (props.vehicleType === "moto") {
    vehicleImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"; // Moto image
  } else if (props.vehicleType === "auto") {
    vehicleImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"; // Auto image
  } else {
    vehicleImage = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"; // Default image
  }

  return (
    <>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-1">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between items-center flex-col ">
        <img
          className="h-44 "
          src={vehicleImage}
          alt={`${props.vehicleType} image`}
        />
    
        {/* Wave Animation */}
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="w-full mt-3">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-cash-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash / UPI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LookingForDriver;
