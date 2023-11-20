import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCurrentUser } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("Successfully updated username");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateUser, isLoading };
}
