import { SET_USERS_LIST } from "../types";

export const usersListReducer = (state = { usersList: [] }, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return action.payload;
    // case SET_LOADING:
    //   return { ...state, loading: action.payload };
    default:
      return state;
  }
};
