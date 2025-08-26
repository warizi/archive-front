import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodoApi, updateTodoApi } from "../api/todoApi";
import { TODO_QUERY_KEY, type TodoWithIdPresent } from "@/entities/todo";


export const useUpdateTodo = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoWithIdPresent) => updateTodoApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.detail(id) });
      // queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  });
};

export const useGetTodo = (id?: number) => useQuery({
  queryKey: TODO_QUERY_KEY.detail(id),
  queryFn: () => getTodoApi(id),
  enabled: !!id
})
