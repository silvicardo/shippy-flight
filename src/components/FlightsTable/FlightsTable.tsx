import React from "react";
import FlightsTableRow from "./FlightsTableRow";
import { Airport, Flight } from "../../ApiEntitiesTypes";
import useApiResource from "../../hooks/useApiResource";
import useFilteredFlights from "../../hooks/useFilteredFlights";

export interface IFlightsTableProps {
  className?: string;
}

export const FlightsTable = ({ className = "" }: IFlightsTableProps) => {
  const { isFilterActive, filteredFlights } = useFilteredFlights();
  if (filteredFlights.length === 0) {
    if (isFilterActive) return <p>Nessun risultato per la tua ricerca</p>;
    return null;
  }
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
        {filteredFlights.map((flight) => (
          <FlightsTableRow key={flight.id} {...flight} />
        ))}
      </tbody>
    </table>
  );
};

export default FlightsTable;
