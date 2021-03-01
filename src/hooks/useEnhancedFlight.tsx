import { useCallback, useMemo } from "react";
import { Flight } from "../ApiEntitiesTypes";
import useAirport from "./useAirport";
import useAirline from "./useAirline";

export interface EnhancedFlight extends Pick<Flight, "id"> {
  airlineName: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  priceClass: "economico" | "conveniente" | "premium";
  distance: number;
  duration: { hours: number; minutes: number; seconds: number };
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const PLANE_KM_PER_HOUR = 500;

export const EURO_PER_KM_SCALE = {
  cheap: 3,
  average: 6,
} as const;

export default function useEnhancedFlight(flight: Flight): EnhancedFlight {
  const {
    latitude: departureAirportLatitude,
    longitude: departureAirportLongitude,
    codeIata: departureAirportIata,
  } = useAirport(flight.departureAirportId);
  const {
    latitude: arrivalAirportLatitude,
    longitude: arrivalAirportLongitude,
    codeIata: arrivalAirportIata,
  } = useAirport(flight.arrivalAirportId);

  const { name: airlineName } = useAirline(flight.airlineId);

  const getEnhancedFlightData = useCallback(() => {
    const distance = parseInt(
      getDistanceFromLatLonInKm(
        departureAirportLatitude,
        departureAirportLongitude,
        arrivalAirportLatitude,
        arrivalAirportLongitude
      ).toString()
    );

    let time = +distance / PLANE_KM_PER_HOUR;

    let timeInSeconds = time * 60 * 60;

    let hours = Math.floor(timeInSeconds / 3600);

    let seconds = timeInSeconds % 60;

    let showingMinutes = parseInt((((time - hours) * 3600) / 60).toString());

    const priceClass =
      flight.price / distance < EURO_PER_KM_SCALE.cheap
        ? "economico"
        : flight.price / distance < EURO_PER_KM_SCALE.average
        ? "conveniente"
        : "premium";

    return {
      id: flight.id,
      airlineName: airlineName,
      departureAirportCode: departureAirportIata,
      arrivalAirportCode: arrivalAirportIata,
      priceClass: priceClass,
      distance: distance,
      duration: { hours: hours, minutes: showingMinutes, seconds: seconds },
    } as const;
  }, [
    departureAirportLatitude,
    departureAirportLongitude,
    arrivalAirportLatitude,
    arrivalAirportLongitude,
    airlineName,
    departureAirportIata,
    arrivalAirportIata,
    flight.price,
    flight.id,
  ]);

  return useMemo(() => getEnhancedFlightData(), [getEnhancedFlightData]);
}
