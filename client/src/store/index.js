import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "./reducers/userReducer";
import { usersListReducer } from "./reducers/usersListReducer";

const initialstate = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  userReducer,
  usersListReducer,
});

const store = createStore(
  rootReducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
