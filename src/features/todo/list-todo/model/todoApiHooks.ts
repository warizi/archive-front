import { TODO_QUERY_KEY } from "@/entities/todo";
import { useQuery } from "@tanstack/react-query";
import { getCategorizedRepeatTodoListApi, getCategorizedTodoListApi, getTodoApi, getTodoListApi, getUnCategorizedRepeatTodoListApi, getUnCategorizedTodoListApi } from "../api/todoApi";
import type { PageRequest } from "@/shared/type/request";

export const useGetTodo = (id?: number) => useQuery({
  queryKey: TODO_QUERY_KEY.detail(id),
  queryFn: () => getTodoApi(id),
  enabled: !!id
})

export const useGetTodoList = ({ page, size, sort }: PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.LIST,
  queryFn: () => getTodoListApi({ page, size, sort })
})

export const useGetUnCategorizedTodoList = ({ page, size, sort }: PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.LIST,
  queryFn: () => getUnCategorizedTodoListApi({ page, size, sort })
});

export const useGetCategorizedTodoList = ({ page, size, sort, id }: { id: number } & PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.CATEGORIZED(id),
  queryFn: () => getCategorizedTodoListApi({ page, size, sort, id })
});

export const useGetUnCategorizedRepeatTodoList = ({ page, size, sort }: PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.REPEAT,
  queryFn: () => getUnCategorizedRepeatTodoListApi({ page, size, sort })
});

export const useGetCategorizedRepeatTodoList = ({ page, size, sort, id }: { id: number } & PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.REPEAT_CATEGORIZED(id),
  queryFn: () => getCategorizedRepeatTodoListApi({ page, size, sort, id })
});