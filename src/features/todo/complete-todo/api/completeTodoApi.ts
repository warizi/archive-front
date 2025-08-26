import type { TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const completeTodoApi = async ({ id, completed }: {id: number, completed: boolean}): Promise<ApiResponse<TodoWithIdPresent>> => {
  const response = await apiClient.post(`/api/todos/complete/${id}`, { completed });

  return response.data;
}