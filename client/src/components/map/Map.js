import React from "react";
import GoogleMapReact from "google-map-react";
import "./Map.module.css";
import LocationPin from "./LocationPin";

const Map = ({ location, zoomLevel }) => {
  if (!location.lat || !location.lng) {
    return "not loaded";
  }
  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAP_KEY }}
          center={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
