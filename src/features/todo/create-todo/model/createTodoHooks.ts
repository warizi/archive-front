import { TODO_QUERY_KEY, type TodoType } from "@/entities/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodoApi } from "../api/createTodoApi";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoType) => createTodoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  })
}
