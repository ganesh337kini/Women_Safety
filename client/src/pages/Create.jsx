import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
  const url = "http://localhost:5000/api/sos/create";

  const [formData, setFormData] = useState({
    phone: "",
    relatives: [{ name: "", phone: "" }],
    location: { lat: 0, lng: 0 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelativeChange = (index, e) => {
    const { name, value } = e.target;
    const newRelatives = [...formData.relatives];
    newRelatives[index][name] = value;
    setFormData({ ...formData, relatives: newRelatives });
  };

  const addRelative = () => {
    if (formData.relatives.length < 5) {
      setFormData({
        ...formData,
        relatives: [...formData.relatives, { name: "", phone: "" }],
      });
    }
  };

  const removeRelative = (index) => {
    const newRelatives = formData.relatives.filter((_, i) => i !== index);
    setFormData({ ...formData, relatives: newRelatives });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData((prev) => ({
          ...prev,
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        }));
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");
    await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("SOS Profile submitted!");
    navigate("/profile");
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-pink-500 text-center mb-4">
          💖 Create SOS Profile
        </h2>

        {/* Phone */}
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
          required
        />

        {/* Relatives */}
        <div>
          <h3 className="font-semibold text-pink-600 mb-2">
            👨‍👩‍👧‍👦 Emergency Relatives (1 to 5)
          </h3>
          {formData.relatives.map((rel, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <input
                name="name"
                value={rel.name}
                onChange={(e) => handleRelativeChange(index, e)}
                placeholder="Relative Name"
                className="p-2 flex-1 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
              <input
                name="phone"
                value={rel.phone}
                onChange={(e) => handleRelativeChange(index, e)}
                placeholder="Relative Phone"
                className="p-2 flex-1 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeRelative(index)}
                  className="bg-pink-200 hover:bg-pink-300 px-3 py-1 rounded-lg text-pink-700 font-bold"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          {formData.relatives.length < 5 && (
            <button
              type="button"
              onClick={addRelative}
              className="mt-2 text-sm bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
            >
              ➕ Add Relative
            </button>
          )}
        </div>

        {/* Location */}
        <div>
          <h3 className="font-semibold text-pink-600 mb-2">📍 Live Location</h3>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="mb-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full"
          >
            📌 Use My Current Location
          </button>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="lat"
              value={formData.location.lat}
              onChange={handleChange}
              placeholder="Latitude"
              className="p-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              name="lng"
              value={formData.location.lng}
              onChange={handleChange}
              placeholder="Longitude"
              className="p-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition"
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
