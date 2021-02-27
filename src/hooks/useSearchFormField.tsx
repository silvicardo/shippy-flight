import { SearchFieldName, setSearchAirportId } from "../redux/routeSearchSlice";
import useApiResource from "./useApiResource";
import { Airport } from "../ApiEntitiesTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "../redux/store";
import React from "react";
import useRouteSearch from "./useRouteSearch";

export default function useSearchFormField(name: SearchFieldName) {
  const { resource: apiAirports } = useApiResource<Airport>("/airports/all");
  const { isLoading: isSearchLoading } = useRouteSearch();
  const dispatch = useDispatch();
  const departureAirportId = useSelector((state: RootReduxState) => state.search.departureAirportId);
  const arrivalAirportId = useSelector((state: RootReduxState) => state.search.arrivalAirportId);
  const fieldValue = useSelector(({ search }: RootReduxState) =>
    name === "arrival" ? arrivalAirportId : departureAirportId
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchAirportId({ field: e.target.name as SearchFieldName, value: +e.target.value }));
  };

  const canFieldChange =
    departureAirportId === arrivalAirportId || departureAirportId === 0 || arrivalAirportId === 0 || !isSearchLoading;

  return { apiAirports, fieldValue, departureAirportId, arrivalAirportId, onChange, isSearchLoading, canFieldChange };
}
