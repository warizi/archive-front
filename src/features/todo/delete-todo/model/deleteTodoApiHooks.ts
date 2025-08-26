import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TODO_QUERY_KEY } from "@/entities/todo";
import { deleteTodoApi } from "../api/deleteTodoApi";

export const useDeleteTodoMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  })
}