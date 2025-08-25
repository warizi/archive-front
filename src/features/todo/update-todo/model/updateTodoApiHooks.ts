import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoApi } from "../api/updateTodoApi";
import { TODO_QUERY_KEY, type TodoWithIdPresent } from "@/entities/todo";

export const useUpdateTodo = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoWithIdPresent) => updateTodoApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.detail(id) });
    }
  });
};