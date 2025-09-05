import type { NoteFolderWithIdPresent } from "@/entities/note";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const getNoteFolderAll = async (): Promise<ApiResponse<NoteFolderWithIdPresent[]>> => {
  const response = await apiClient.get<ApiResponse<NoteFolderWithIdPresent[]>>("/api/noteFolder/all");
  
  return response.data;
};