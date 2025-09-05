import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const deleteNoteFolderApi = async (noteFolderId: number): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete<ApiResponse<void>>(`/api/noteFolder/${noteFolderId}`);

  return response.data;
}