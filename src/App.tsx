import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

type Airport = {
  id: number;
  codeIata: string;
  latitude: number;
  longitude: number;
};

type FlightResult = {
  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
};

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const PLANE_KM_PER_HOUR = 100;

const API_BASE_URL = "https://recruitment.shippypro.com/flight-engine/api";
const AUTH_TOKEN = "1|MN9ruQV0MFEsgOzMo8crw8gB575rsTe2H5U1y2Lj";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common["Authorization"] = `Bearer 1 ${AUTH_TOKEN}`;

function App() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [departureAirportCode, setDepartureAirportCode] = useState<Airport["codeIata"] | "">("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState<Airport["codeIata"] | "">("");

  const [directFlightsResults, setDirectFlightsResults] = useState<FlightResult[]>([]);
  const [travelDistance, setTravelDistance] = useState<number>(0);
  const [directFlightTravelTime, setDirectFlightTravelTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const onSubmit = (e: any) => {
    e.preventDefault();
    searchDirectFlights();
    getCoordinatesFromFlightAirports();
  };

  const getCoordinatesFromFlightAirports = () => {
    let departureAirport = {} as Airport;
    let arrivalAirport = {} as Airport;
    let airportIndex = 0;
    while (!(departureAirport.id && arrivalAirport.id) && airportIndex < airports.length) {
      let currentAirport = airports[airportIndex];
      if (departureAirportCode === currentAirport.codeIata) {
        departureAirport = currentAirport;
      }
      if (arrivalAirportCode === currentAirport.codeIata) {
        arrivalAirport = currentAirport;
      }
      airportIndex++;
    }

    if (!departureAirport.id && !arrivalAirport.id) throw new Error("invalid airports codes");

    const distance = parseInt(
      getDistanceFromLatLonInKm(
        departureAirport.latitude,
        departureAirport.longitude,
        arrivalAirport.latitude,
        arrivalAirport.longitude
      ).toString()
    );

    setTravelDistance(+distance);

    let time = +distance / PLANE_KM_PER_HOUR;

    let timeInSeconds = time * 60 * 60;

    let hours = Math.floor(timeInSeconds / 3600);

    let totalMinutes = Math.floor(timeInSeconds / 60);

    let seconds = timeInSeconds % 60;

    let showingMinutes = parseInt((((time - hours) * 3600) / 60).toString());

    setDirectFlightTravelTime({ hours: hours, minutes: showingMinutes, seconds: seconds });
  };

  const onDepartureAirportChange = (e: any) => {
    setDepartureAirportCode(e.target.value);
  };

  const onArrivalAirportChange = (e: any) => {
    setArrivalAirportCode(e.target.value);
  };

  const searchDirectFlights = useCallback(() => {
    axiosInstance.get(`/flights/from/${departureAirportCode}/to/${arrivalAirportCode}`).then(({ data }) => {
      setDirectFlightsResults(data.data);
    });
  }, [departureAirportCode, arrivalAirportCode]);

  const getAirports = () => {
    axiosInstance.get(`/airports/all`).then((response) => {
      console.log(response.data);
      setAirports(response.data.data);
    });
  };
  useEffect(() => {
    getAirports();
  }, []);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>
          Partenza:
          <select value={departureAirportCode} onChange={onDepartureAirportChange}>
            <option key={0} value={0}>
              Seleziona il tuo aeroporto{" "}
            </option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.codeIata}>
                {airport.codeIata}
              </option>
            ))}
          </select>
        </label>
        <label>
          Arrivo:
          <select value={arrivalAirportCode} onChange={onArrivalAirportChange}>
            <option key={0} value={0}>
              Seleziona il tuo aeroporto{" "}
            </option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.codeIata}>
                {airport.codeIata}
              </option>
            ))}
          </select>
        </label>
        <button type={"submit"}>Cerca voli</button>
      </form>
      {directFlightsResults.length > 0 ? (
        <div className={"flights-results"}>
          <h2>
            Hai scelto di volare da {departureAirportCode} a {arrivalAirportCode}
            <br />
            Km tratta : {travelDistance} in ore {directFlightTravelTime.hours} e {directFlightTravelTime.minutes} minuti
          </h2>

          <h3>VOLI DIRETTI</h3>
          {directFlightsResults.map((result) => (
            <div key={result.id} className={"flight-result"}>
              <p>Arline id : {result.airlineId}</p>
              <p>Price: {result.price}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
