import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "pickup") {
      setPickup(value);
      setActiveField("pickup");
    } else {
      setDestination(value);
      setActiveField("destination");
    }
    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const value = suggestion.description || suggestion.name || "";
    if (activeField === "pickup") {
      setPickup(value);
    } else if (activeField === "destination") {
      setDestination(value);
    }
    setPanelOpen(false);
    setSuggestions([]);
  };

  async function findTrip() {
    setPanelOpen(false);
    setVehiclePanelOpen(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  useGSAP(() => {
    if (panelRef.current && panelCloseRef.current) {
      gsap.to(panelRef.current, {
        height: panelOpen ? "70%" : "0%",
        opacity: panelOpen ? 1 : 0,
        padding: panelOpen ? 24 : 0,
        duration: 0.3,
      });
      gsap.to(panelCloseRef.current, {
        rotate: panelOpen ? 180 : 360,
        duration: 0.3,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, {
        transform: vehiclePanelOpen ? "translateY(0%)" : "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelRef.current) {
      gsap.to(confirmRidePanelRef.current, {
        transform: confirmRidePanelOpen ? "translateY(0%)" : "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if (vehicleFoundRef.current) {
      gsap.to(vehicleFoundRef.current, {
        transform: vehicleFound ? "translateY(0%)" : "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriverRef.current) {
      gsap.to(waitingForDriverRef.current, {
        transform: waitingForDriver ? "translateY(0%)" : "translateY(100%)",
        duration: 0.4,
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Live Map */}
      <div className="h-screen w-screen relative z-0">
      <LiveTracking  height="70%" />

      </div>

      {/* Search & Panels - pointer-events tuned */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">
        <div className="h-[30%] p-6 bg-white relative pointer-events-auto z-10">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            ref={panelCloseRef}
            className="absolute text-2xl top-6 right-6 cursor-pointer"
          >
            <i className="ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => handleInputChange("pickup", e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          {(pickup.trim() || destination.trim()) && (
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full"
            >
              Find Trip
            </button>
          )}
        </div>

        {/* Expandable Panel */}
        <div
          ref={panelRef}
          className={`bg-white overflow-hidden transition-all duration-300 ${
            !panelOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {panelOpen && (
            <LocationSearchPanel
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              setPanelOpen={setPanelOpen}
            />
          )}
        </div>
      </div>

      {/* Conditional Panels */}
      {vehiclePanelOpen && (
        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-20 bottom-0 bg-white px-3 py-10 pt-12"
        >
          <VehiclePanel
            selectVehicle={setVehicleType}
            fare={fare}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      )}

      {confirmRidePanelOpen && (
        <div
          ref={confirmRidePanelRef}
          className="fixed w-full z-20 bottom-0 bg-white px-3 py-10"
        >
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}

      {vehicleFound && (
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-20 bottom-0 bg-white px-3 py-10"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}

      {waitingForDriver && (
        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-20 bottom-0 bg-white px-3 py-10"
        >
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
