import React from "react";
import { useDispatch } from "react-redux";
import { setIsFlightsFilterActive } from "../../redux/flightsFilterSlice";

export interface IFlightsFilterOpenButtonProps {
  className?: string;
}

export const FlightsFilterOpenButton = ({ className = "" }: IFlightsFilterOpenButtonProps) => {
  const dispatch = useDispatch();
  const activateFilter = () => dispatch(setIsFlightsFilterActive(true));
  return (
    <button type="button" className={`btn btn-info ${className}`} onClick={activateFilter}>
      Filtra
    </button>
  );
};

export default FlightsFilterOpenButton;
