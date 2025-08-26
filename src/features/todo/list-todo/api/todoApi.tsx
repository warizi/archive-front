import type { TodoWithIdPresent } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { PageRequest } from "@/shared/type/request";
import type { ApiResponse, PageResponse } from "@/shared/type/response";

export const getTodoApi = async (id?: number): Promise<ApiResponse<TodoWithIdPresent>> => {
  if (!id) throw new Error("ID is required");
  const response = await apiClient.get<ApiResponse<TodoWithIdPresent>>(`/api/todos/${id}`);

  return response.data;
}

export const getTodoListApi = async ({ page = 0, size = 20, sort="id,desc"}: PageRequest): Promise<PageResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<TodoWithIdPresent>>>("/api/todos", {
    params: { page, size, sort }
  });
  return response.data.data;
}

export const getUnCategorizedTodoListApi = async ({ page = 0, size = 20, sort="id,desc"}: PageRequest): Promise<PageResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<TodoWithIdPresent>>>("/api/todos/uncategorized", {
    params: { page, size, sort }
  });

  return response?.data.data;
}

export const getUnCategorizedRepeatTodoListApi = async ({ page = 0, size = 20, sort="id,desc"}: PageRequest): Promise<PageResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<TodoWithIdPresent>>>("/api/todos/uncategorized/repeat", {
    params: { page, size, sort }
  });
  return response.data.data;
}

export const getCategorizedTodoListApi = async ({ page = 0, size = 20, sort="id,desc", id }: {id:number} & PageRequest): Promise<PageResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<TodoWithIdPresent>>>(`/api/todos/categorized/${id}`, {
    params: { page, size, sort }
  });

  return response?.data.data;
}

export const getCategorizedRepeatTodoListApi = async ({ page = 0, size = 20, sort="id,desc", id }: {id:number} & PageRequest): Promise<PageResponse<TodoWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<TodoWithIdPresent>>>(`/api/todos/categorized/${id}/repeat`, {
    params: { page, size, sort }
  });

  return response?.data.data;
}