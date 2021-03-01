import React from "react";
import useEnhancedFlight from "../../hooks/useEnhancedFlight";
import { Flight } from "../../ApiEntitiesTypes";
import FlightDurationLabel from "../common/FlightDurationLabel";

export interface IFoundFlightProps extends Flight {
  className?: string;
}

export const FoundFlight = ({ className = "", ...flight }: IFoundFlightProps) => {
  const enhancedFlight = useEnhancedFlight(flight);

  return (
    <div className={"flight-result"}>
      <p>{enhancedFlight.airlineName}</p>
      <p>
        Da {enhancedFlight.departureAirportCode} a {enhancedFlight.arrivalAirportCode}
      </p>
      <p>A soli {flight.price} € </p>
      <p>
        Durata : <FlightDurationLabel hours={enhancedFlight.duration.hours} minutes={enhancedFlight.duration.minutes} />
      </p>
      <p>
        <b>{enhancedFlight.priceClass}</b>
      </p>
    </div>
  );
};

export default FoundFlight;
