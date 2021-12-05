import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationPin = ({ text }) => (
  <div className="pin">
    <IoLocationSharp className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

export default LocationPin;
