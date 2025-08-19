import type { TodoCategory } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";

export const todoCateGetAllApi = async (): Promise<TodoCategory[]> => {
  const res = await apiClient.get<TodoCategory[]>("/api/todo/category");

  return res.data;
}

export const todoCateSaveApi = async (data: TodoCategory): Promise<TodoCategory> => {
  const res = await apiClient.post<TodoCategory>("/api/todo/category", data);

  return res.data;
};

export const todoCateDeleteApi = async (id: number): Promise<void> => {
  const res = await apiClient.delete(`/api/todo/category/${id}`);

  return res.data;
};