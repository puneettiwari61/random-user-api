import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/styles.scss";
import Profile from "./components/Profile";
import { fetchUser, getUser } from "./store/actions";

const App = () => {
  const { loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewUser();
  }, []);

  const getNewUser = () => {
    dispatch(fetchUser())
      .then((user) => dispatch(getUser({ user, loading: false })))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Profile getNewUser={getNewUser} />
    </div>
  );
};

export default App;
