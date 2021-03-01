import React from "react";
import InputRadio, { IInputRadioProps } from "../common/InputRadio";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "../../redux/store";
import { setFlightsFilterPriceOrdering } from "../../redux/flightsFilterSlice";

export interface IFlightsFilterPriceOrderingInputRadioProps
  extends Omit<IInputRadioProps, "name" | "checked" | "onChange"> {
  value: "asc" | "desc";
}

export const FlightsFilterPriceOrderingInputRadio = (props: IFlightsFilterPriceOrderingInputRadioProps) => {
  const priceOrdering = useSelector((state: RootReduxState) => state.flightsFilter.priceOrdering);
  const dispatch = useDispatch();

  const onPriceOrderingRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFlightsFilterPriceOrdering(e.target.value as RootReduxState["flightsFilter"]["priceOrdering"]));
  };

  return (
    <InputRadio
      {...props}
      name={"price-ordering"}
      onChange={onPriceOrderingRadioChange}
      checked={priceOrdering === props.value}
    />
  );
};

export default FlightsFilterPriceOrderingInputRadio;
