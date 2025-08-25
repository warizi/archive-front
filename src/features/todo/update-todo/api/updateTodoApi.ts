import type { TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";

export const updateTodoApi = async (id: number, data: TodoWithIdPresent) => {
  const response = await apiClient.put(`/api/todos/${id}`, data);
  return response.data;
}