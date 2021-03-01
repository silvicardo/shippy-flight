import React from "react";
import AirportSelect from "../common/AirportSelect";
import useApiResource from "../../hooks/useApiResource";
import { Airport } from "../../ApiEntitiesTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "../../redux/store";
import { setFlightsFilterAirportId } from "../../redux/flightsFilterSlice";

export interface IFlightsFilterAirportSelectProps {
  className?: string;
}

export const FlightsFilterAirportSelect: React.FC<IFlightsFilterAirportSelectProps> = ({ className = "" }) => {
  const { resource: airports } = useApiResource<Airport>("/airports/all");
  const dispatch = useDispatch();

  const airportId = useSelector((state: RootReduxState) => state.flightsFilter.airportId);

  const onAirportSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFlightsFilterAirportId(+e.target.value));
  };
  return (
    <AirportSelect
      className={className}
      label={<b className={"text-white"}>Aeroporto</b>}
      name={"airport"}
      onChange={onAirportSelectChange}
      value={airportId}
      disabled={false}
      apiAirports={airports}
    />
  );
};

export default FlightsFilterAirportSelect;
