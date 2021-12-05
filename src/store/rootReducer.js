import { combineReducers } from "redux";

import filmsReducer from "./films/reducer";
import actorsReducer from "./actors/reducer";

export default combineReducers({
  filmsReducer,
  actorsReducer,
});
