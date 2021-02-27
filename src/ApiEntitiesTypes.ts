export interface Airport {
  id: number;
  codeIata: string;
  latitude: number;
  longitude: number;
}

export interface Flight {
  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
}

export interface Airline {
  id: 1;
  name: string;
  logoFilename: null | string;
  codeIataPrefix: string;
}
