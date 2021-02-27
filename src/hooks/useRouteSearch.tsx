import useSWR from "swr";
import useEnhancedRoute from "./useEnhancedRoute";
import { Flight } from "../ApiEntitiesTypes";
import { useMemo } from "react";
import useRouteSearchForm from "./useRouteSearchForm";

export default function useRouteSearch() {
  const { departureAirportCode, arrivalAirportCode } = useRouteSearchForm();

  const shouldSearch = departureAirportCode && arrivalAirportCode && departureAirportCode !== arrivalAirportCode;

  const { data, error } = useSWR<{ data: Flight[] }>(() =>
    shouldSearch ? `/flights/from/${departureAirportCode}/to/${arrivalAirportCode}` : null
  );

  const isLoading = useMemo(() => !error && !data, [error, data]);

  const enhancedRoute = useEnhancedRoute(data?.data ? data.data : null);

  return {
    route: enhancedRoute,
    departureAirportCode,
    arrivalAirportCode,
    isLoading,
    error,
  };
}
