import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// **** SLICE STATE TYPE ******//

export type FlightsFilterSliceState = {
  isActive: boolean;
  airportTypology: "departure" | "arrival";
  airportId: number;
  priceOrdering: "asc" | "desc";
};

// **** REDUCER CASE FUNCTIONS ******//

const initialState: FlightsFilterSliceState = {
  isActive: false,
  airportTypology: "departure",
  airportId: 0,
  priceOrdering: "asc",
};

// **** SLICE ******//

export const flightsFilterSlice = createSlice({
  name: "flightsFilter",
  initialState: initialState,
  reducers: {
    setIsFlightsFilterActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setFlightsFilterAirportTypology: (state, action: PayloadAction<FlightsFilterSliceState["airportTypology"]>) => {
      state.airportTypology = action.payload;
    },
    setFlightsFilterAirportId: (state, action: PayloadAction<number>) => {
      state.airportId = action.payload;
    },
    setFlightsFilterPriceOrdering: (state, action: PayloadAction<FlightsFilterSliceState["priceOrdering"]>) => {
      state.priceOrdering = action.payload;
    },
  },
});

export const {
  setIsFlightsFilterActive,
  setFlightsFilterAirportTypology,
  setFlightsFilterAirportId,
  setFlightsFilterPriceOrdering,
} = flightsFilterSlice.actions;
