import useApiResource from "./useApiResource";
import { Airline } from "../ApiEntitiesTypes";

export default function useAirline(id: number) {
  const { resourceMap: airlinesMap } = useApiResource<Airline>("/airlines/all");
  return airlinesMap[id];
}
