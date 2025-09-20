import { useQuery } from "@tanstack/react-query";
import { getCountCompletedTodo, getCountRepeatTodo, getCountUncompletedTodo } from "../api/countTodoApi";
import { TODO_QUERY_KEY } from "@/entities/todo";

export const useGetCompletedTodoCount = () => useQuery({
  queryFn: getCountCompletedTodo,
  queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.COUNT_COMPLETED],
})

export const useGetUncompletedTodoCount = () => useQuery({
  queryFn: getCountUncompletedTodo,
  queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.COUNT_UNCOMPLETED],
})

export const useGetRepeatTodoCount = () => useQuery({
  queryFn: getCountRepeatTodo,
  queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.COUNT_REPEAT],
})