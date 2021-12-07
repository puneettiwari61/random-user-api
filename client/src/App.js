import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/styles.scss";
import Profile from "./components/Profile";
import { fetchUser, getUser, fetchUsersList } from "./store/actions";

const App = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("I am env", process.env.MAP_KEY);
    getNewUser();
  }, []);

  useEffect(() => getUsersList(), [user]);

  const getNewUser = () => {
    dispatch(fetchUser())
      .then((user) => dispatch(getUser({ user, loading: false })))
      .catch((err) => console.error(err));
  };

  const getUsersList = () => {
    dispatch(fetchUsersList());
  };

  return (
    <div className="App">
      <Profile getNewUser={getNewUser} />
    </div>
  );
};

export default App;
