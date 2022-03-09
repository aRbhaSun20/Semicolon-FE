import { combineReducers, createStore } from "redux";
import { InputReducers } from "./InputsReducers";
import { ModelReducers } from "./ModelReducers";
import { PredictionReducers } from "./PredictionsReducers";
import { UserReducers } from "./UserReducers";

const allReducers = combineReducers({
  user: UserReducers,
  model: ModelReducers,
  prediction: PredictionReducers,
  input: InputReducers,
});

const dataStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default dataStore;
