import { useQuery } from "@tanstack/react-query";
import { getListings } from "../services/apiListings";

export function useListings() {
  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  return { listings, isLoading };
}
