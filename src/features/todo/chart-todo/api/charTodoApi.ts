import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export interface CompletedTodoWeekChart {
  weekDate: string;
  value: number;
}

export interface CompletedTodoWeekChartResponse {
  chartData: CompletedTodoWeekChart[];
}

export const getCompletedTodoWeekChart = async (weeksBack: number): Promise<ApiResponse<CompletedTodoWeekChartResponse>> => {
  const params = { weeksBack: weeksBack || 0 };
  const response = await apiClient.get<ApiResponse<CompletedTodoWeekChartResponse>>(`/api/todos/completed/week/chart`, { params });

  return response.data;
}