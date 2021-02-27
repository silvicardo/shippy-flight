import "./App.css";
import { useEffect, useRef, useState } from "react";
import FoundFlight from "./FoundFlight";
import useApiResource from "./hooks/useApiResource";
import useRouteSearch from "./hooks/useRouteSearch";
import { Airport } from "./ApiEntitiesTypes";

function App() {
  const { resource: apiAirports } = useApiResource<Airport>("/airports/all");
  const [departureAirportId, setDepartureAirportId] = useState<Airport["id"] | 0>(0);
  const [arrivalAirportId, setArrivalAirportId] = useState<Airport["id"] | 0>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { route: routeFlights, departureAirport, arrivalAirport, isLoading: isSearchingRoute } = useRouteSearch(
    departureAirportId,
    arrivalAirportId,
    isSubmitting
  );
  const prevIsSearchingRouteRef = useRef(isSearchingRoute);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const onDepartureAirportChange = (e: any) => {
    setDepartureAirportId(e.target.value);
  };

  const onArrivalAirportChange = (e: any) => {
    setArrivalAirportId(e.target.value);
  };

  useEffect(() => {
    if (prevIsSearchingRouteRef.current && !isSearchingRoute) {
      setIsSubmitting(false);
    }
    prevIsSearchingRouteRef.current = isSearchingRoute;
  }, [isSearchingRoute]);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>
          Partenza:
          <select name={"departure"} value={departureAirportId} onChange={onDepartureAirportChange}>
            <option key={0} value={0}>
              Seleziona il tuo aeroporto{" "}
            </option>
            {apiAirports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.codeIata} - {airport.id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Arrivo:
          <select name="arrival" value={arrivalAirportId} onChange={onArrivalAirportChange}>
            <option key={0} value={0}>
              Seleziona il tuo aeroporto{" "}
            </option>
            {apiAirports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.codeIata} - {airport.id}
              </option>
            ))}
          </select>
        </label>
        <button type={"submit"} disabled={isSubmitting}>
          Cerca voli
        </button>
      </form>
      {routeFlights.length > 0 ? (
        <div className={"flights-results"}>
          <h2>
            Hai scelto di volare da {departureAirport.codeIata} a {arrivalAirport.codeIata}
          </h2>

          <h3>{routeFlights.length == 1 ? "TRATTA DIRETTA" : "TRATTA CON SCALO"}</h3>
          {routeFlights.map((flight) => (
            <FoundFlight key={flight.id} {...flight} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
