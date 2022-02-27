import { combineReducers, createStore } from "redux";
import { UserReducers } from "./UserReducers";

const allReducers = combineReducers({
  user: UserReducers,
});

const dataStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default dataStore;
