import React from "react";
import useApiResource from "../hooks/useApiResource";
import { Flight } from "../ApiEntitiesTypes";
import FlightsTable from "./FlightsTable";

export interface IAllFlightsViewProps {
  className?: string;
}

export const AllFlightsPage = (props: IAllFlightsViewProps) => {
  const { resource: allFlights, isLoading } = useApiResource<Flight>("/flights/all");

  if (isLoading) return null;
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
