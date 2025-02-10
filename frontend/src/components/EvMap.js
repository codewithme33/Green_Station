import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";




const userIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/gps.png", // Reference from public folder
  shadowUrl: process.env.PUBLIC_URL + "/assets/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const stationIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/placeholder.png",
  shadowUrl: process.env.PUBLIC_URL + "/assets/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const EVMap = () => {
  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        fetch(`http://localhost:5000/api/stations/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=5000`)
          .then((res) => res.json())
          .then((data) => setStations(data))
          .catch((err) => console.error("Error fetching stations:", err));
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ width: "60%", height: "60vh", borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        {userLocation ? (
          <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User Marker (Green) */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Nearby EV Stations (Red) */}
            {stations.map((station, index) => (
              <Marker key={index} position={[station.location.coordinates[1], station.location.coordinates[0]]} icon={stationIcon}>
                <Popup>
                  <strong>{station.name}</strong> <br />
                  {station.queueStatus > 0 ? `Queue: ${station.queueStatus}` : "No waiting"} <br />
                  {station.hasGreenPoints ? "Green Points Available" : "No Green Points"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p style={{ textAlign: "center", paddingTop: "20px" }}>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default EVMap;
