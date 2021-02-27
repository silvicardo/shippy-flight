import useSWR from "swr";
import { useMemo } from "react";

export default function useApiResource<T extends { id: number }>(
  endpoint: string
): { resource: T[]; resourceMap: typeof resourceMap; isLoading: boolean; error: any } {
  const { data, error } = useSWR<{ data: T[] }>(endpoint);

  const resourceMap = useMemo(() => {
    if (data?.data) {
      return data.data.reduce((acc, next) => {
        acc[next.id] = next;
        return acc;
      }, {} as { [key: number]: T });
    }
    return {} as { [key: number]: T };
  }, [data]);

  return {
    resource: data?.data ? data.data : [],
    resourceMap: resourceMap,
    isLoading: !error && !data,
    error: error,
  };
}
