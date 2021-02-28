import { combineReducers } from "redux";
import { routeSearchSlice } from "./routeSearchSlice";
import { flightsFilterSlice } from "./flightsFilterSlice";

const rootReducer = combineReducers({
  search: routeSearchSlice.reducer,
  flightsFilter: flightsFilterSlice.reducer,
});

export default rootReducer;
