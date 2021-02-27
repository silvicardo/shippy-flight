import React from "react";
import { useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";
import useRouteSearch from "../hooks/useRouteSearch";

export interface IRouteSearchLoadingProps {
  className?: string;
}

export const RouteSearchLoading = ({ className = "" }: IRouteSearchLoadingProps) => {
  const { isLoading: isSearchLoading } = useRouteSearch();
  const departureAirportId = useSelector((state: RootReduxState) => state.search.departureAirportId);
  const arrivalAirportId = useSelector((state: RootReduxState) => state.search.arrivalAirportId);

  return departureAirportId !== 0 &&
    arrivalAirportId !== 0 &&
    departureAirportId !== arrivalAirportId &&
    isSearchLoading ? (
    <div className={className}>Stiamo cercando la migliore tratta per te</div>
  ) : null;
};

export default RouteSearchLoading;
