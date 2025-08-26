import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTodoSubApi } from "../api/completeTodoSubApi";
import { TODO_QUERY_KEY } from "@/entities/todo";

export const useCompleteTodoSub = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) => completeTodoSubApi({ id, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TODO_QUERY_KEY.LIST,
      });
    },
  });

  return mutation;
};
