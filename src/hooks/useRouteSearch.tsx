import useApiResource from "./useApiResource";
import useSWR from "swr";
import useEnhancedRoute from "./useEnhancedRoute";
import { Airport, Flight } from "../ApiEntitiesTypes";

export default function useRouteSearch(departureAirportId: number, arrivalAirportId: number, shouldFetch: boolean) {
  const { resourceMap: airportsMap } = useApiResource<Airport>("/airports/all");

  const departureAirportCode = shouldFetch || departureAirportId > 0 ? airportsMap[departureAirportId].codeIata : null;
  const arrivalAirportCode = shouldFetch || arrivalAirportId > 0 ? airportsMap[arrivalAirportId].codeIata : null;

  const { data, error } = useSWR<{ data: Flight[] }>(() =>
    shouldFetch ? `/flights/from/${departureAirportCode}/to/${arrivalAirportCode}` : null
  );

  const enhancedRoute = useEnhancedRoute(data?.data ? data.data : null);

  return {
    route: enhancedRoute,
    departureAirport: airportsMap[departureAirportId],
    arrivalAirport: airportsMap[arrivalAirportId],
    isLoading: !error && !data,
    error: error,
  };
}
