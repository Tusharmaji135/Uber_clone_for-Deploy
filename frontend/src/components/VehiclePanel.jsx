import React from "react";

function VehiclePanel(props) {
  return (
    <>
      <h5
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a ride</h3>
      {/* rides */}
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.selectVehicle("car");
          props.setVehiclePanelOpen(false);
        }}
        className="flex border-1 active:border-2 active:border-black rounded-xl w-full items-center justify-between pl-0.5 pr-1 py-0 px-3 mb-2"
      >
        <img
          className="h-25"
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold mr-3">₹{props.fare.car || "N/A"}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.selectVehicle("auto");
          props.setVehiclePanelOpen(false);
        }}
        className="flex border-1 active:border-2 active:border-black rounded-xl w-full items-center justify-between pl-0.5 pr-1 py-0 px-3 mb-2"
      >
        <img
          className="h-25"
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-sm">
            Auto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold mr-3">₹{props.fare.auto || "N/A"}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.selectVehicle("moto");
          props.setVehiclePanelOpen(false);
        }}
        className="flex border-1 active:border-2 active:border-black rounded-xl w-full items-center justify-between pl-0.5 pr-1 py-0 px-3 mb-2"
      >
        <img
          className="h-25"
          src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-sm">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>2
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold mr-3">₹{props.fare.moto || "N/A"}</h2>
      </div>
      
    </>
  );
}

export default VehiclePanel;
