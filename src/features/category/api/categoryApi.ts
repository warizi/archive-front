import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import { apiClient } from "@/shared/config/axiosClient";
import type { PageRequest } from "@/shared/type/request";
import type { ApiResponse, PageResponse } from "@/shared/type/response";

export const getCategoryListApi = async ({ page = 0, size = 20, sort="id,sortOrder "}:PageRequest ): Promise<PageResponse<CategoryWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<PageResponse<CategoryWithIdPresent>>>("/api/category", {
    params: { page, size, sort }
  });
  return response.data.data;
}

export const getCategoryApi = async (id: number): Promise<ApiResponse<CategoryWithIdPresent>> => {
  const response = await apiClient.get<ApiResponse<CategoryWithIdPresent>>(`/api/category/${id}`);
  return response.data;
}

export const createCategoryApi = async (data: Omit<CategoryWithIdPresent, "id">): Promise<CategoryWithIdPresent> => {
  const response = await apiClient.post<ApiResponse<CategoryWithIdPresent>>("/api/category", data);
  return response.data.data;
}
export const updateCategoryApi = async (id: number, data: Partial<CategoryWithIdPresent>): Promise<CategoryWithIdPresent> => {
  const response = await apiClient.put<ApiResponse<CategoryWithIdPresent>>(`/api/category/${id}`, data);
  return response.data.data;
}

export const deleteCategoryApi = async (id: number): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/category/${id}`);
  return response.data;
}

export const updateCategoryOrdersApi = async (orders: Map<number, number>): Promise<ApiResponse<void>> => {
  const response = await apiClient.patch<ApiResponse<void>>("/api/category/orders", { newOrders: Object.fromEntries(orders) });
  return response.data;
}