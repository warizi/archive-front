import type { TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const getTodoApi = async (id: number): Promise<ApiResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<TodoWithIdPresent>>(`/api/todos/${id}`);
  
  return response.data;
}