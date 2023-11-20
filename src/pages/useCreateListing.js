import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createListing } from "../services/apiListings";

export function useCreateListing() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      toast.success("New listing successfully created");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      navigate("/");
    },
  });

  return { mutate, isLoading };
}
