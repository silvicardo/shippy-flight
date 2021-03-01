import { useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";
import useApiResource from "./useApiResource";
import { Airline, Airport, Flight } from "../ApiEntitiesTypes";
import { useCallback } from "react";

export default function useFilteredFlights() {
  const { isLoading: isLoadingAirports } = useApiResource<Airport>("/airports/all");
  const { resource: flights, isLoading: isLoadingFlights } = useApiResource<Flight>("/flights/all");
  const { isLoading: isLoadingAirlines } = useApiResource<Airline>("/airlines/all");

  const isFilterActive = useSelector((state: RootReduxState) => state.flightsFilter.isActive);
  const airportTypology = useSelector((state: RootReduxState) => state.flightsFilter.airportTypology);
  const airportId = useSelector((state: RootReduxState) => state.flightsFilter.airportId);
  const priceOrdering = useSelector((state: RootReduxState) => state.flightsFilter.priceOrdering);

  const priceCompare = useCallback(
    (a: Flight, b: Flight) => (priceOrdering === "asc" ? a.price - b.price : b.price - a.price),
    [priceOrdering]
  );
  const isFlightWithIdByAirportTypology = useCallback(
    (flight: Flight) =>
      airportTypology === "departure" ? flight.departureAirportId === airportId : flight.arrivalAirportId === airportId,
    [airportTypology, airportId]
  );

  const filteredFlights = [] as Array<Flight>;

  if (isLoadingAirports || isLoadingFlights || isLoadingAirlines || !flights)
    return { filteredFlights, isFilterActive };

  if (!isFilterActive) return { filteredFlights: flights, isFilterActive };

  if (airportId === 0) {
    return { filteredFlights: flights.sort(priceCompare), isFilterActive };
  }

  return {
    filteredFlights: flights.filter(isFlightWithIdByAirportTypology).sort(priceCompare),
    isFilterActive,
  };
}
