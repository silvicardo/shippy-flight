import useApiResource from "./useApiResource";
import { Airport } from "../ApiEntitiesTypes";
import { useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";

export default function useRouteSearchForm() {
  const { resourceMap: airportsMap } = useApiResource<Airport>("/airports/all");
  const departureAirportId = useSelector((state: RootReduxState) => state.search.departureAirportId);
  const arrivalAirportId = useSelector((state: RootReduxState) => state.search.arrivalAirportId);
  const departureAirportCode = airportsMap[departureAirportId]?.codeIata;
  const arrivalAirportCode = airportsMap[arrivalAirportId]?.codeIata;

  return {
    departureAirportId,
    arrivalAirportId,
    departureAirportCode,
    arrivalAirportCode,
  };
}
