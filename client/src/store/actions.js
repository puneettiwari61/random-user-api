import store from ".";
import { createUserObject } from "../components/utils";
import { GET_USER, SET_LOADING } from "./types";

export const getUser = (data) => {
  return {
    type: GET_USER,
    payload: data,
  };
};

export const setLoading = (data) => {
  return {
    type: SET_LOADING,
    payload: data,
  };
};

export const fetchUser = () => {
  store.dispatch({ type: SET_LOADING, payload: true });
  return function () {
    return fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((data) => {
        return createUserObject(data.results[0]);
      });
  };
};
