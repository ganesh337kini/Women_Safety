import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SOSSection = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const navigate = useNavigate();

  const handleSOSClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(currentLocation);
          alert(
            `SOS Sent!\nYour location:\nLatitude: ${currentLocation.lat}\nLongitude: ${currentLocation.lng}`
          );
        },
        (err) => {
          console.error(err);
          alert("Unable to retrieve location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleEmergencyCall = () => {
    navigate("/speedlist");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex flex-col justify-center items-center p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8 text-center">
        🚨 Emergency SOS
      </h2>

      {/* Big SOS Button */}
      <button
        onClick={handleSOSClick}
        className="bg-white text-red-500 font-extrabold text-5xl md:text-6xl w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform mb-6"
      >
        SOS
      </button>

      {/* Display Current Location */}
      {location.lat && location.lng && (
        <div className="bg-white/90 p-4 rounded-xl shadow text-pink-700 mb-6 text-center">
          <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
          <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
        </div>
      )}

      {/* Emergency Call Button */}
      <button
        onClick={handleEmergencyCall}
        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
      >
        <span className="text-2xl">📞</span>
        <span>Emergency Contacts</span>
      </button>
    </section>
  );
};

export default SOSSection;
