import { TODO_QUERY_KEY } from "@/entities/todo";
import { useQuery } from "@tanstack/react-query";
import { getTodoApi } from "../api/todoApi";

export const useGetTodo = (id: number) => useQuery({
  queryKey: TODO_QUERY_KEY.detail(id),
  queryFn: () => getTodoApi(id)
})