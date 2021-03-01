import React from "react";

export interface IFlightDurationLabelProps {
  className?: string;
  hours: number;
  minutes: number;
}

export const FlightDurationLabel: React.FC<IFlightDurationLabelProps> = ({ className = "", hours, minutes }) => {
  return (
    <label className={className}>
      {hours > 0 ? `${hours} ${hours > 1 ? "ore" : "ora"} e ` : null}
      {`${minutes} ${minutes > 1 ? "minuti" : "minuto"}`}
    </label>
  );
};

export default FlightDurationLabel;
