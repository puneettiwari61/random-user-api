import { GET_USER, SET_LOADING } from "../types";

export const userReducer = (state = { user: {}, loading: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
