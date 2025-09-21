import { TODO_QUERY_KEY, TODO_REPEAT_FREQUENCY } from "@/entities/todo";
import { useQuery } from "@tanstack/react-query";
import { getCategorizedRepeatTodoListApi, getCategorizedTodoListApi, getFrequencyRepeatTodoListApi, getTodayAllApi, getTodoApi, getTodoListApi, getUnCategorizedRepeatTodoListApi, getUnCategorizedTodoListApi } from "../api/todoApi";
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

export const useGetUnCategorizedRepeatTodoList = () => useQuery({
  queryKey: TODO_QUERY_KEY.REPEAT,
  queryFn: () => getUnCategorizedRepeatTodoListApi()
});

export const useGetCategorizedRepeatTodoList = ({ id }: { id: number }) => useQuery({
  queryKey: TODO_QUERY_KEY.REPEAT_CATEGORIZED(id),
  queryFn: () => getCategorizedRepeatTodoListApi({ id })
});

export const useGetFrequencyRepeatTodoList = ({ page, size, sort, frequency }: { frequency: keyof typeof TODO_REPEAT_FREQUENCY } & PageRequest) => useQuery({
  queryKey: TODO_QUERY_KEY.REPEAT_FREQUENCY(frequency),
  queryFn: () => getFrequencyRepeatTodoListApi({ page, size, sort, frequency })
})

export const useGetTodayAllTodoList = () => useQuery({
  queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.TODAY_ALL],
  queryFn: () => getTodayAllApi()
})