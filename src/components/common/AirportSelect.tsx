import React, { ReactElement } from "react";
import { Airport } from "../../ApiEntitiesTypes";

export interface IAirportSelectProps {
  className?: string;
  label: string | ReactElement;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  disabled: boolean;
  apiAirports: Airport[];
}

export const AirportSelect = ({
  className = "",
  label,
  name,
  value,
  onChange,
  disabled,
  apiAirports,
}: IAirportSelectProps) => {
  return (
    <div className={`form-group ${className}`}>
      <label className={"text-uppercase"}>{label}</label>
      <select className="form-control" name={name} value={value} onChange={onChange} disabled={disabled}>
        <option value={0}>Scegli un aeroporto</option>
        {apiAirports.map((airport) => (
          <option key={airport.id} value={airport.id}>
            {airport.codeIata}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportSelect;
