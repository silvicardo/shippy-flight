import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FlightsFilterSliceState = {
  isActive: boolean;
  airportTypology: "departure" | "arrival";
  airportId: number;
  priceOrdering: "asc" | "desc";
};

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
      if (!action.payload) {
        state.isActive = false;
        state.airportTypology = "departure";
        state.airportId = 0;
        state.priceOrdering = "asc";
      }
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
