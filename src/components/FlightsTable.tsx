import React from "react";
import FlightsTableRow from "./FlightsTableRow";
import { Flight } from "../ApiEntitiesTypes";

export interface IFlightsTableProps {
  className?: string;
  flights: Flight[];
}

export const FlightsTable = ({ flights, className = "" }: IFlightsTableProps) => {
  return (
    <table className={`table ${className}`}>
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Da</th>
          <th scope="col">A</th>
          <th scope="col">Durata</th>
          <th scope="col">Costo</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <FlightsTableRow key={flight.id} {...flight} />
        ))}
      </tbody>
    </table>
  );
};

export default FlightsTable;
