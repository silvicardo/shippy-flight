import React from "react";
import FlightsFilterAirportTypologyInputRadio from "./FlightsFilterAirportTypologyInputRadio";
import FlightsFilterPriceOrderingInputRadio from "./FlightsFilterPriceOrderingInputRadio";
import FlightsFilterAirportSelect from "./FlightsFilterAirportSelect";
import { useSelector } from "react-redux";
import { RootReduxState } from "../../redux/store";
import FlightsFilterOpenButton from "./FlightsFilterOpenButton";
import FlightsFilterCloseButton from "./FlightsFilterCloseButton";

export interface IFlightsFilterProps {
  className?: string;
}

export const FlightsFilter: React.FC<IFlightsFilterProps> = ({ className = "" }) => {
  const isFilterActive = useSelector((state: RootReduxState) => state.flightsFilter.isActive);

  if (!isFilterActive) {
    return (
      <div className={"mb-5"}>
        <FlightsFilterOpenButton />
      </div>
    );
  }
  return (
    <>
      <form className={`border border-dark rounded py-4 px-4 px-md-0 bg-info position-relative ${className}`}>
        <FlightsFilterCloseButton className={"filter-close"} />
        <div className="form-row">
          <div className="col-12 col-md-4">
            <p className={"text-uppercase text-white text-white"}>
              <b>Tipologia Aeroporto</b>
            </p>
            <div className="form-check form-check-inline">
              <FlightsFilterAirportTypologyInputRadio
                value={"departure"}
                id={"airport-typology-radio-departure"}
                label={"Partenza"}
              />
              <FlightsFilterAirportTypologyInputRadio
                value={"arrival"}
                id={"airport-typology-radio-arrival"}
                label={"Arrivo"}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <FlightsFilterAirportSelect />
          </div>
          <div className="col-12 col-md-4">
            <p className={"text-uppercase text-white"}>
              <b>Ordinamento Prezzo</b>
            </p>
            <div className="form-check form-check-inline">
              <FlightsFilterPriceOrderingInputRadio
                value={"asc"}
                id={"price-ordering-radio-asc"}
                label={"Dal più economico"}
              />
              <FlightsFilterPriceOrderingInputRadio
                value={"desc"}
                id={"price-ordering-radio-desc"}
                label={"Dal più lussuoso"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FlightsFilter;
