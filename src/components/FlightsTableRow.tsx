import React from "react";
import useEnhancedFlight from "../hooks/useEnhancedFlight";
import { Flight } from "../ApiEntitiesTypes";

export interface IFlightsTableRowProps extends Flight {
  className?: string;
}

export const FlightsTableRow = ({ className = "", ...flight }: IFlightsTableRowProps) => {
  const enhancedFlight = useEnhancedFlight(flight);

  return (
    <tr key={flight.id}>
      <th scope="row">{flight.id}</th>
      <td>{enhancedFlight.departureAirportCode}</td>
      <td>{enhancedFlight.arrivalAirportCode}</td>
      <td>
        {enhancedFlight.duration.hours > 0 ? `${enhancedFlight.duration.hours} ore e` : null}
        {enhancedFlight.duration.minutes} minuti
      </td>
      <td>{flight.price} €</td>
    </tr>
  );
};

export default FlightsTableRow;
