import React from "react";
import { EnhancedFlight } from "./hooks/useEnhancedRoute";

export interface IFoundFlightProps extends EnhancedFlight {
  className?: string;
}

export const FoundFlight: React.FC<IFoundFlightProps> = (props) => {
  return (
    <div className={"flight-result"}>
      <p>Arline id : {props.airlineId}</p>
      <p>Price: {props.price} </p>
      <p>
        <b>{props.priceClass}</b>
      </p>
    </div>
  );
};

export default FoundFlight;
