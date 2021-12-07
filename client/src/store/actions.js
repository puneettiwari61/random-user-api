import store from ".";
import { createUserObject, createUserRequestPayload } from "../components/utils";
import { GET_USER, SET_LOADING, SET_USERS_LIST } from "./types";

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
        saveUser(createUserRequestPayload(data.results[0]));
        return createUserObject(data.results[0]);
      });
  };
};

export const saveUser = (user) => {
  return fetch("/api/v1/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "from save user");
    });
};

export const fetchUsersList = () => {
  return function () {
    return fetch("/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        store.dispatch({ type: SET_USERS_LIST, payload: data.users });
      });
  };
};

export const deleteUser = (id) => {
  return function () {
    return fetch(`/api/v1/users/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(fetchUsersList());
      });
  };
};

export const updateUser = (user) => {
  return function () {
    return fetch(`/api/v1/users/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(fetchUsersList());
      });
  };
};
