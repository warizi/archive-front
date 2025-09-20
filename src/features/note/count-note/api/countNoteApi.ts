import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const getCountNote = async (): Promise<ApiResponse<number>> => {
  const response = await apiClient.get<ApiResponse<number>>(`/api/note/totalCount`);

  return response.data;
}