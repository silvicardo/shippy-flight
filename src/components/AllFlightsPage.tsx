import React from "react";
import useApiResource from "../hooks/useApiResource";
import { Airport, Flight } from "../ApiEntitiesTypes";
import FlightsTable from "./FlightsTable";

export interface IAllFlightsViewProps {
  className?: string;
}

export const AllFlightsPage = (props: IAllFlightsViewProps) => {
  const { isLoading: isLoadingAirports } = useApiResource<Airport>("/airports/all");
  const { resource: allFlights, isLoading: isLoadingFlights } = useApiResource<Flight>("/flights/all");

  if (isLoadingAirports || isLoadingFlights) return null;

  return (
    <div className={"container pt-5"}>
      <section className={"our-flights"}>
        <div className={"mb-5"}>
          <h1>I nostri voli</h1>
        </div>
        <FlightsTable flights={allFlights} />
      </section>
    </div>
  );
};

export default AllFlightsPage;
