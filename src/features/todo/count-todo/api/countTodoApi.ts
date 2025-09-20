import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const getCountCompletedTodo = async (): Promise<ApiResponse<number>> => {
  const response = await apiClient.get<ApiResponse<number>>(`/api/todos/completed/totalCount`);

  return response.data;
}

export const getCountUncompletedTodo = async (): Promise<ApiResponse<number>> => {
  const response = await apiClient.get<ApiResponse<number>>(`/api/todos/uncompleted/totalCount`);

  return response.data;
}

export const getCountRepeatTodo = async (): Promise<ApiResponse<number>> => {
  const response = await apiClient.get<ApiResponse<number>>(`/api/todos/repeat/totalCount`);

  return response.data;
}