import React from "react";

function RidePopUp(props) {
  return (
    <div>
      <h5 onClick={() => {
        props.setRidePopUpPanel(false);
      }} className=" text-center w-[93%] absolute top-0 ">
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">New Ride Available !</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-13 w-13 object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " "+ props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 justify-between items-center flex-col ">
        <div className="w-full mt-3">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-cash-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash / UPI</p>
            </div>
          </div>
        </div>
        <div className="flex mt-3 px-1 w-full items-center justify-between">
        
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className=" bg-gray-300 text-gray-700  font-semibold p-3 px-10 rounded-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.setRidePopUpPanel(false);
          props.confirmRide()
            
          }}
          className=" bg-green-600 mt-1 text-white font-semibold p-3 px-10 rounded-lg"
        >
          Accept
        </button>
        </div>
      </div>
    </div>
  );
}

export default RidePopUp;
