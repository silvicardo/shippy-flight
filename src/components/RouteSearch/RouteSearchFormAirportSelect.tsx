import React from "react";
import { SearchFieldName } from "../../redux/routeSearchSlice";
import useSearchFormField from "../../hooks/useSearchFormField";
import AirportSelect from "../common/AirportSelect";

export interface IRouteSearchFormAirportSelectProps {
  className?: string;
  name: SearchFieldName;
  label: string;
}

export const RouteSearchFormAirportSelect = ({ className = "", name, label }: IRouteSearchFormAirportSelectProps) => {
  const { apiAirports, fieldValue, onChange, canFieldChange } = useSearchFormField(name);

  return (
    <AirportSelect
      className={className}
      label={label}
      name={name}
      onChange={onChange}
      disabled={!canFieldChange}
      apiAirports={apiAirports}
      value={fieldValue}
    />
  );
};

export default RouteSearchFormAirportSelect;
