import React from "react";
import { useDispatch } from "react-redux";
import { setIsFlightsFilterActive } from "../../redux/flightsFilterSlice";

export interface IFlightsFilterCloseButtonProps {
  className?: string;
}

export const FlightsFilterCloseButton = ({ className = "" }: IFlightsFilterCloseButtonProps) => {
  const dispatch = useDispatch();
  const disableFilter = () => dispatch(setIsFlightsFilterActive(false));
  return (
    <button type="button" className={`close ${className}`} aria-label="Close" onClick={disableFilter}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export default FlightsFilterCloseButton;
