import React from "react";
import useEnhancedFlight from "../../hooks/useEnhancedFlight";
import { Flight } from "../../ApiEntitiesTypes";
import FlightDurationLabel from "../common/FlightDurationLabel";

export interface IFlightsTableRowProps extends Flight {
  className?: string;
}

export const FlightsTableRow = ({ className = "", ...flight }: IFlightsTableRowProps) => {
  const enhancedFlight = useEnhancedFlight(flight);

  return (
    <tr key={flight.id}>
      <td scope="row">{enhancedFlight.departureAirportCode}</td>
      <td>{enhancedFlight.arrivalAirportCode}</td>
      <td>{enhancedFlight.airlineName}</td>
      <td>
        <FlightDurationLabel hours={enhancedFlight.duration.hours} minutes={enhancedFlight.duration.minutes} />
      </td>
      <td>{flight.price.toFixed(2)} €</td>
    </tr>
  );
};

export default FlightsTableRow;
