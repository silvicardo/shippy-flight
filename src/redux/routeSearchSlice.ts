import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RouteSearchSliceState = {
  departureAirportId: number;
  arrivalAirportId: number;
};

export type SearchFieldName = "departure" | "arrival";

const initialState: RouteSearchSliceState = {
  departureAirportId: 0,
  arrivalAirportId: 0,
};
// **** SLICE ******//

export const routeSearchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchAirportId: (state, action: PayloadAction<{ field: SearchFieldName; value: number | string }>) => {
      if (action.payload.field === "departure") {
        state.departureAirportId = +action.payload.value;
      }
      if (action.payload.field === "arrival") {
        state.arrivalAirportId = +action.payload.value;
      }
    },
    resetSearchFields: (state) => {
      state.departureAirportId = 0;
      state.arrivalAirportId = 0;
    },
  },
});

export const { setSearchAirportId, resetSearchFields } = routeSearchSlice.actions;
