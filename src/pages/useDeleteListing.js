import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteListing } from "../services/apiListings";

export function useDeleteListing() {
  const queryClient = useQueryClient();

  const { mutate: deleteL, isLoading } = useMutation({
    mutationFn: deleteListing,
    onSuccess: () => {
      toast.success("Listing successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  return { deleteL, isLoading };
}
