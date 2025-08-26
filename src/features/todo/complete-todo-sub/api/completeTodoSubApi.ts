import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const completeTodoSubApi = async ({ id, completed }: { id: number, completed: boolean }): Promise<ApiResponse<void>> => {
  const response = await apiClient.post(`/api/todoSub/complete/${id}`, { completed });

  return response.data;
}