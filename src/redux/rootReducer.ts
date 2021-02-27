import { combineReducers } from "redux";
import { routeSearchSlice } from "./routeSearchSlice";

const rootReducer = combineReducers({
  search: routeSearchSlice.reducer,
});

export default rootReducer;
