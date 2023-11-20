import { useQuery } from "@tanstack/react-query";
import { getListing } from "../services/apiListings";

export function useListing(listingId) {
  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing"],
    queryFn: () => getListing(listingId),
  });

  return { listing, isLoading };
}
