import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import UsersList from "./UsersList";

const Details = ({ user }) => {
  const otherDetails = ["image", "name", "country", "latitude", "longitude"];

  return (
    <>
      <div className="details flex">
        <div className="profile_image">
          <img src={user.image} alt={user.firstName} />
        </div>
        <div className="basic_details">
          <div className="name_wrapper">
            <span className="name">{user.firstName}</span>
            <IoLocationSharp className="location_icon" />
            <span className="location">{user.country}</span>
          </div>
          <div className="details_wrapper">
            {Object.entries(user).map(([property, value], id) => {
              if (otherDetails.includes(property)) {
                return;
              }
              return (
                <React.Fragment key={id}>
                  <div className="property"> {property.toUpperCase()}</div>
                  <div className="value"> {value}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
