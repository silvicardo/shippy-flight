import React from "react";
import useEnhancedFlight from "../../hooks/useEnhancedFlight";
import { Flight } from "../../ApiEntitiesTypes";
import FlightDurationLabel from "../FlightDurationLabel";

export interface IFoundFlightProps extends Flight {
  className?: string;
}

export const FoundFlight = ({ className = "", ...flight }: IFoundFlightProps) => {
  const enhancedFlight = useEnhancedFlight(flight);

  return (
    <div className={"flight-result"}>
      <p>Arline id : {flight.airlineId}</p>
      <p>
        Da {enhancedFlight.departureAirportCode} a {enhancedFlight.arrivalAirportCode}
      </p>
      <p>Price: {flight.price} € </p>
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
