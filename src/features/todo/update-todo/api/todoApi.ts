import type { TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const updateTodoApi = async (id: number, data: TodoWithIdPresent) => {
  const response = await apiClient.put(`/api/todos/${id}`, data);
  return response.data;
}

export const getTodoApi = async (id?: number): Promise<ApiResponse<TodoWithIdPresent>> => {
  if (!id) throw new Error("ID is required");
  const response = await apiClient.get<ApiResponse<TodoWithIdPresent>>(`/api/todos/${id}`);

  return response.data;
}
