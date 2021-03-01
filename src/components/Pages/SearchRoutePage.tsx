import React, { useEffect } from "react";
import RouteSearchForm from "../RouteSearch/RouteSearchForm";
import RouteSearchFormAirportSelect from "../RouteSearch/RouteSearchFormAirportSelect";
import RouteSearchLoading from "../RouteSearch/RouteSearchLoading";
import RouteSearchResult from "../RouteSearch/RouteSearchResult";
import { useDispatch } from "react-redux";
import { resetSearchFields } from "../../redux/routeSearchSlice";

export interface ISearchRoutePageProps {
  className?: string;
}

export const SearchRoutePage = ({ className = "" }: ISearchRoutePageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSearchFields());
  }, []);
  return (
    <div className={`container ${className}`}>
      <RouteSearchForm className={"mt-5"}>
        <div className="form-row">
          <RouteSearchFormAirportSelect className={"offset-md-2 col-md-4"} name={"departure"} label={"Partenza:"} />
          <RouteSearchFormAirportSelect className={"col-md-4"} name={"arrival"} label={"Arrivo:"} />
        </div>
      </RouteSearchForm>
      <RouteSearchLoading />
      <RouteSearchResult />
    </div>
  );
};

export default SearchRoutePage;
