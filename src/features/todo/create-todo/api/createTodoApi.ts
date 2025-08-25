import type { TodoType, TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const createTodoApi = async (data: TodoType): Promise<ApiResponse<TodoWithIdPresent>> => {
  const response = await apiClient.post<ApiResponse<TodoWithIdPresent>>("/api/todos", data);
  return response.data;
};