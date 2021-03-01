import React from "react";
import InputRadio, { IInputRadioProps } from "../common/InputRadio";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "../../redux/store";
import { setFlightsFilterAirportTypology } from "../../redux/flightsFilterSlice";

export interface IFlightsFilterAirportTypologyInputRadioProps
  extends Omit<IInputRadioProps, "name" | "checked" | "onChange"> {
  value: "departure" | "arrival";
}

export const FlightsFilterAirportTypologyInputRadio = (props: IFlightsFilterAirportTypologyInputRadioProps) => {
  const dispatch = useDispatch();

  const airportTypology = useSelector((state: RootReduxState) => state.flightsFilter.airportTypology);
  const onAirportTypologyRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFlightsFilterAirportTypology(e.target.value as RootReduxState["flightsFilter"]["airportTypology"]));
  };
  return (
    <InputRadio
      name={"airport-typology"}
      {...props}
      onChange={onAirportTypologyRadioChange}
      checked={airportTypology === props.value}
    />
  );
};

export default FlightsFilterAirportTypologyInputRadio;
