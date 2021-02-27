import useApiResource from "./useApiResource";
import { Airport } from "../ApiEntitiesTypes";

export default function useAirport(id: number) {
  const { resourceMap: airportsMap } = useApiResource<Airport>("/airports/all");

  return airportsMap[id];
}
