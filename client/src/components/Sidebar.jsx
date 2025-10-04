import React, { useState } from 'react';

const typeLabels = {
  hospital: 'Hospitals',
  hotel: 'Hotels',
  police: 'Police Stations',
};

const karnatakaPlaces = [
  { id: 1, name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { id: 2, name: 'Mysore', lat: 12.2958, lng: 76.6394 },
  { id: 3, name: 'Mangalore', lat: 12.9141, lng: 74.856 },
  { id: 4, name: 'Hubli', lat: 15.3647, lng: 75.124 },
  { id: 5, name: 'Belgaum', lat: 15.8497, lng: 74.4977 },
  { id: 6, name: 'Shimoga', lat: 13.9299, lng: 75.5681 },
  { id: 7, name: 'Davangere', lat: 14.4648, lng: 75.9217 },
  { id: 8, name: 'Tumkur', lat: 13.3416, lng: 77.101 },
  { id: 9, name: 'Kalaburagi', lat: 17.3297, lng: 76.8343 },
  { id: 10, name: 'Bellary', lat: 15.1394, lng: 76.9214 },
  { id: 11, name: 'Dharwad', lat: 15.4589, lng: 75.0078 },
  { id: 12, name: 'Chikmagalur', lat: 13.3167, lng: 75.774 },
  { id: 13, name: 'Hassan', lat: 13.0062, lng: 76.1027 },
  { id: 14, name: 'Kolar', lat: 13.136, lng: 78.1298 },
  { id: 15, name: 'Bidar', lat: 17.9133, lng: 77.5385 },
];

function Sidebar({
  places,
  selectedType,
  onTypeChange,
  onSelectPlace,
  weather,
  selectedPlace,
  currentLocation,
  onLocationChange,
}) {
  const [selectedDropPlaceId, setSelectedDropPlaceId] = useState(
    karnatakaPlaces.find((p) =>
      currentLocation && p.lat === currentLocation.lat && p.lng === currentLocation.lng
        ? p.id
        : null
    ) || ''
  );

  const handlePlaceSelect = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedDropPlaceId(id);
    const place = karnatakaPlaces.find((p) => p.id === id);
    if (place) {
      onLocationChange({ lat: place.lat, lng: place.lng });
    }
  };

  return (
    <div
      style={{
        width: 350,
        background: 'linear-gradient(180deg, #f5f0ff, #ffe6f0)', // soft purple-pink gradient
        padding: 20,
        overflowY: 'auto',
        flexShrink: 0,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#6b21a8', marginBottom: 20 }}>Travel Companion</h2>

      {/* Karnataka Places Dropdown */}
      <div style={{ marginBottom: 20, fontWeight: 'bold' }}>
        <label>
          Select Karnataka Place:{' '}
          <select
            value={selectedDropPlaceId || ''}
            onChange={handlePlaceSelect}
            style={{
              width: 300,
              padding: 6,
              borderRadius: 6,
              border: '1px solid #d1c4fc',
              fontWeight: '600',
              background: 'white',
              color: '#4b0082',
            }}
          >
            <option value="" disabled>
              -- Select a place --
            </option>
            {karnatakaPlaces.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Use Current Location Button */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => {
            if (!navigator.geolocation) {
              alert('Geolocation is not supported by your browser.');
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const { latitude, longitude } = pos.coords;
                setSelectedDropPlaceId('');
                onLocationChange({ lat: latitude, lng: longitude });
              },
              () => alert('Failed to get your current location.')
            );
          }}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: '600',
            width: '100%',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = 'linear-gradient(90deg, #9333ea, #db2777)')
          }
          onMouseLeave={(e) =>
            (e.target.style.background = 'linear-gradient(90deg, #a855f7, #ec4899)')
          }
          title="Use Current Location"
        >
          Use Current Location
        </button>
      </div>

      {/* Weather */}
      <div
        style={{
          marginBottom: 20,
          fontWeight: 'bold',
          color: '#6b21a8',
          background: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: 6,
        }}
      >
        Weather: {weather ? `${weather.temp}°C, ${weather.desc}` : 'Loading...'}
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: 20 }}>
        {Object.entries(typeLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onTypeChange(key)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              background:
                selectedType === key
                  ? 'linear-gradient(90deg, #a855f7, #ec4899)'
                  : '#e0d7f8',
              color: selectedType === key ? 'white' : '#4b0082',
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => {
              if (selectedType !== key) e.target.style.background = '#d8b4fe';
            }}
            onMouseLeave={(e) => {
              if (selectedType !== key) e.target.style.background = '#e0d7f8';
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Places List */}
      <div>
        {places.length === 0 && <p style={{ color: '#4b0082' }}>No places found.</p>}
        {places.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelectPlace(place)}
            style={{
              cursor: 'pointer',
              marginBottom: 12,
              padding: 14,
              borderRadius: 8,
              background:
                selectedPlace && selectedPlace.id === place.id
                  ? 'linear-gradient(90deg, #f0d6ff, #fbc4e6)'
                  : '#f8f8f8',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => {
              if (!selectedPlace || selectedPlace.id !== place.id)
                e.target.style.background = '#f3e8ff';
            }}
            onMouseLeave={(e) => {
              if (!selectedPlace || selectedPlace.id !== place.id)
                e.target.style.background = '#f8f8f8';
            }}
          >
            <h4 style={{ margin: 0, color: '#6b21a8' }}>{place.name}</h4>
            <div style={{ fontSize: 14, color: '#4b0082' }}>
              {place.address || 'Address not available'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
