import { useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";
import useApiResource from "./useApiResource";
import { Airport, Flight } from "../ApiEntitiesTypes";

export default function useFilteredFlights() {
  const { resource: airports, isLoading: isLoadingAirports } = useApiResource<Airport>("/airports/all");
  const { resource: flights, isLoading: isLoadingFlights } = useApiResource<Flight>("/flights/all");

  const isFilterActive = useSelector((state: RootReduxState) => state.flightsFilter.isActive);
  const airportTypology = useSelector((state: RootReduxState) => state.flightsFilter.airportTypology);
  const airportId = useSelector((state: RootReduxState) => state.flightsFilter.airportId);
  const priceOrdering = useSelector((state: RootReduxState) => state.flightsFilter.priceOrdering);

  if (isLoadingAirports || isLoadingFlights || !flights)
    return { filteredFlights: [] as Array<Flight>, isFilterActive };
  if (!isFilterActive) return { filteredFlights: flights, isFilterActive };
  if (airportId === 0) {
    return { filteredFlights: flights.sort((a: Flight, b: Flight) => a.price - b.price), isFilterActive };
  }

  const isFlightWithIdByAirportTypology = (flight: Flight) =>
    airportTypology === "departure" ? flight.departureAirportId === airportId : flight.arrivalAirportId === airportId;

  return {
    filteredFlights: flights.filter(isFlightWithIdByAirportTypology).sort((a: Flight, b: Flight) => a.price - b.price),
    isFilterActive,
  };
}
