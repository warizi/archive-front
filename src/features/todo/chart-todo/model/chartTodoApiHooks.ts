import { TODO_QUERY_KEY } from "@/entities/todo";
import { useQuery } from "@tanstack/react-query";
import { getCompletedTodoWeekChart } from "../api/charTodoApi";

export const useGetCompletedTodoWeekChart = (weeksBack: number) => useQuery({
  queryFn: () => getCompletedTodoWeekChart(weeksBack),
  queryKey: [TODO_QUERY_KEY.LIST, TODO_QUERY_KEY.CHART_COMPLETED_WEEK, weeksBack],
})