import React from "react";
import useRouteSearch from "../../hooks/useRouteSearch";
import FoundFlight from "./FoundFlight";

export interface IRouteSearchResultProps {
  className?: string;
}

export const RouteSearchResult = ({ className = "" }: IRouteSearchResultProps) => {
  const { route: routeFlights, departureAirportCode, arrivalAirportCode, isLoading } = useRouteSearch();

  return (
    <>
      {!isLoading && routeFlights.length > 0 ? (
        <div className={`flights-results container ${className}`}>
          <div className={"mb-3"}>
            <h2>
              Hai scelto di volare da {departureAirportCode} a {arrivalAirportCode}
            </h2>
          </div>
          <div className={"mb-5"}>
            <h3>{routeFlights.length === 1 ? "TRATTA DIRETTA" : "TRATTA CON SCALO"}</h3>
          </div>
          <div className={"row justify-content-center align-items-center"}>
            {routeFlights.map((flight, index) => (
              <React.Fragment key={flight.id}>
                <FoundFlight {...flight} />
                <div className={"mr-3"}>{index + 1 < routeFlights.length ? <b>{" > "}</b> : ""}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RouteSearchResult;
