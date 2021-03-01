import { useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";
import useApiResource from "./useApiResource";
import { Airport, Flight } from "../ApiEntitiesTypes";

export default function useFilteredFlights() {
  const { isLoading: isLoadingAirports } = useApiResource<Airport>("/airports/all");
  const { resource: flights, isLoading: isLoadingFlights } = useApiResource<Flight>("/flights/all");

  const isFilterActive = useSelector((state: RootReduxState) => state.flightsFilter.isActive);
  const airportTypology = useSelector((state: RootReduxState) => state.flightsFilter.airportTypology);
  const airportId = useSelector((state: RootReduxState) => state.flightsFilter.airportId);
  const priceOrdering = useSelector((state: RootReduxState) => state.flightsFilter.priceOrdering);

  const filteredFlights = [] as Array<Flight>;

  if (isLoadingAirports || isLoadingFlights || !flights) return { filteredFlights, isFilterActive };

  if (!isFilterActive) return { filteredFlights: flights, isFilterActive };

  const priceCompare =
    priceOrdering === "asc" ? (a: Flight, b: Flight) => a.price - b.price : (a: Flight, b: Flight) => b.price - a.price;

  if (airportId === 0) {
    return { filteredFlights: flights.sort(priceCompare), isFilterActive };
  }

  const isFlightWithIdByAirportTypology = (flight: Flight) =>
    airportTypology === "departure" ? flight.departureAirportId === airportId : flight.arrivalAirportId === airportId;

  return {
    filteredFlights: flights.filter(isFlightWithIdByAirportTypology).sort(priceCompare),
    isFilterActive,
  };
}
