import React, { useState, useEffect } from "react";

const Modal = ({ onRequestClose, data, onSubmit, handleOnChange }) => {
  const otherDetails = ["name", "latitude", "longitude"];

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <h3 className="modal__title">Edit Profile</h3>
        {data &&
          Object.entries(data).map(([property, value], id) => {
            if (otherDetails.includes(property)) {
              return;
            }
            return (
              <div key={id} className="user_input_wrapper">
                <div className="property"> {property.toUpperCase()}</div>
                <div>
                  <input
                    className="input_values"
                    value={value}
                    name={property}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            );
          })}
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
        <button type="button" onClick={onRequestClose}>
          Close this modal
        </button>
        <div className="placeholder" />
        <div className="placeholder" />
        <div className="placeholder medium" />
        <div className="placeholder" />
      </div>
    </div>
  );
};

export default Modal;
