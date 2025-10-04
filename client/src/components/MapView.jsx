import React from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Recenter({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
}

function MapView({ center, places, selectedPlace }) {
  if (!center) return <div style={{ padding: 20 }}>Loading map...</div>;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ flex: 1, height: '100vh', width: '100%' }}
      scrollWheelZoom={true}
    >
      <Recenter center={center} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <CircleMarker
        center={[center.lat, center.lng]}
        radius={10}
        color="blue"
        fillColor="blue"
        fillOpacity={0.5}
      >
        <Popup>Your Location</Popup>
      </CircleMarker>

      {places.map((place) => {
        let color = 'gray';
        if (place.type === 'hotel') color = 'yellow';
        else if (place.type === 'hospital') color = 'blue';
        else if (place.type === 'police') color = 'red';

        return (
          <CircleMarker
            key={place.id}
            center={[place.lat, place.lng]}
            radius={10}
            color={color}
            fillColor={color}
            fillOpacity={0.8}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.address || 'Address not available'}
            </Popup>
          </CircleMarker>
        );
      })}

      {selectedPlace && (
        <CircleMarker
          center={[selectedPlace.lat, selectedPlace.lng]}
          radius={12}
          color="green"
          fillColor="green"
          fillOpacity={1}
        >
          <Popup>
            <strong>{selectedPlace.name}</strong>
            <br />
            {selectedPlace.address || 'Address not available'}
          </Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

export default MapView;
