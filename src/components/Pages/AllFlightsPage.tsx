import React from "react";
import FlightsTable from "../FlightsTable/FlightsTable";
import FlightsFilter from "../FlightsFilter/FlightsFilter";

export interface IAllFlightsViewProps {
  className?: string;
}

export const AllFlightsPage = ({ className = "" }: IAllFlightsViewProps) => {
  return (
    <div className={`container pt-5 ${className}`}>
      <section className={"our-flights"}>
        <div className={"mb-3"}>
          <h1>I nostri voli</h1>
        </div>
        <FlightsFilter className={"my-3"} />
        <FlightsTable />
      </section>
    </div>
  );
};

export default AllFlightsPage;
