import React from "react";
import { SearchFieldName } from "../redux/routeSearchSlice";
import useSearchFormField from "../hooks/useSearchFormField";

export interface IAirportSelectProps {
  className?: string;
  name: SearchFieldName;
  label: string;
}

export const AirportSelect: React.FC<IAirportSelectProps> = ({ name, label }) => {
  const { apiAirports, fieldValue, onChange, canFieldChange } = useSearchFormField(name);

  return (
    <label>
      {label}
      <select name={name} value={fieldValue} onChange={onChange} disabled={!canFieldChange}>
        <option value={0}>Scegli un aerporto</option>
        {apiAirports.map((airport) => (
          <option key={airport.id} value={airport.id}>
            {airport.codeIata} - {airport.id}
          </option>
        ))}
      </select>
    </label>
  );
};

export default AirportSelect;
