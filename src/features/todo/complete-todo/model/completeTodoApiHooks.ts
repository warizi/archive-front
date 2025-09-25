import { useMutation, useQueryClient } from "@tanstack/react-query"
import { completeTodoApi } from "../api/completeTodoApi";
import { TODO_QUERY_KEY } from "@/entities/todo";

export const useCompleteTodoMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) => completeTodoApi({ id, completed }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: TODO_QUERY_KEY.LIST,
      });
      queryClient.invalidateQueries({
        queryKey: TODO_QUERY_KEY.detail(data?.data.id),
      });
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.TODAY_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.COUNT_COMPLETED],
      });
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.COUNT_UNCOMPLETED],
      });
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.CHART_COMPLETED_WEEK],
      });
    },
  })
}