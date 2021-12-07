import React from "react";
import { IoIosRefreshCircle } from "react-icons/io";
import Map from "./map/Map";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Details from "./Details";
import UsersList from "./UsersList";

const Profile = ({ getNewUser }) => {
  const { user, loading } = useSelector((state) => state.userReducer);

  return (
    <div className="profile flex">
      <div className="container">
        <header className="header">
          <div className="heading flex">
            <IoIosRefreshCircle onClick={getNewUser} className="refresh_icon" />
          </div>
        </header>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Details user={user} />
            <UsersList />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
