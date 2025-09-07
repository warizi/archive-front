import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const deleteNote = async (id: number): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/note/${id}`);

  return response.data;
}