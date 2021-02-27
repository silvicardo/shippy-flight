import React from "react";
import { SearchFieldName } from "../redux/routeSearchSlice";
import useSearchFormField from "../hooks/useSearchFormField";

export interface IAirportSelectProps {
  className?: string;
  name: SearchFieldName;
  label: string;
}

export const AirportSelect = ({ className = "", name, label }: IAirportSelectProps) => {
  const { apiAirports, fieldValue, onChange, canFieldChange } = useSearchFormField(name);

  return (
    <div className={`form-group ${className}`}>
      <label className={"text-uppercase"}>{label}</label>
      <select className="form-control" name={name} value={fieldValue} onChange={onChange} disabled={!canFieldChange}>
        <option value={0}>Scegli un aeroporto</option>
        {apiAirports.map((airport) => (
          <option key={airport.id} value={airport.id}>
            {airport.codeIata} - {airport.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportSelect;
