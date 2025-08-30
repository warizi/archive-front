import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../api/deleteApi";
import { WORKSPACE_QUERY_KEY } from "@/entities/workspace";

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY.ALL });
    },
  });

  return mutation;
};
