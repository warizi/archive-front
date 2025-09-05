import type { NoteFolderWithIdPresent } from "@/entities/note";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const createNoteFolder = async (name: string, parentId: string | null): Promise<ApiResponse<NoteFolderWithIdPresent>> => {
  const response = await apiClient.post<ApiResponse<NoteFolderWithIdPresent>>("/api/noteFolder", {
    name,
    parentId
  });

  return response.data;
};