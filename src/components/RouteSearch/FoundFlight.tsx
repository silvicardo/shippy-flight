import React from "react";
import useEnhancedFlight from "../../hooks/useEnhancedFlight";
import { Flight } from "../../ApiEntitiesTypes";

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
        <b>{enhancedFlight.priceClass}</b>
      </p>
    </div>
  );
};

export default FoundFlight;
