import React, { useState, useRef } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PickupDestinationMap() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selecting, setSelecting] = useState('pickup'); // toggles selection mode
  const mapRef = useRef(null);

  const handleMapClick = (event) => {
    const clickedPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (selecting === 'pickup') {
      setPickup(clickedPos);
    } else {
      setDestination(clickedPos);
    }
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const current = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          if (selecting === 'pickup') {
            setPickup(current);
          } else {
            setDestination(current);
          }
          if (mapRef.current) {
            mapRef.current.panTo(current);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div>
      <h2>Select Pickup and Destination</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setSelecting('pickup')}>Set Pickup</button>
        <button onClick={() => setSelecting('destination')}>Set Destination</button>
        <button onClick={handleUseCurrentLocation}>Use My Location</button>
      </div>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={pickup || { lat: 20.5937, lng: 78.9629 }}
          zoom={13}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {pickup && <Marker position={pickup} label="P" />}
          {destination && <Marker position={destination} label="D" />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default PickupDestinationMap;
