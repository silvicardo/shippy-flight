import React from "react";
import useRouteSearch from "../hooks/useRouteSearch";
import FoundFlight from "./FoundFlight";

export interface IRouteSearchResultProps {
  className?: string;
}

export const RouteSearchResult = ({ className = "" }: IRouteSearchResultProps) => {
  const { route: routeFlights, departureAirportCode, arrivalAirportCode, isLoading } = useRouteSearch();

  return (
    <>
      {!isLoading && routeFlights.length > 0 ? (
        <div className={`flights-results ${className}`}>
          <h2>
            Hai scelto di volare da {departureAirportCode} a {arrivalAirportCode}
          </h2>

          <h3>{routeFlights.length === 1 ? "TRATTA DIRETTA" : "TRATTA CON SCALO"}</h3>
          {routeFlights.map((flight) => (
            <FoundFlight key={flight.id} {...flight} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default RouteSearchResult;
