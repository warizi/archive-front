import type { NoteCreateType, NoteWithIdPresent } from "@/entities/note";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const createNote = async (data: NoteCreateType): Promise<ApiResponse<NoteWithIdPresent>> => {
  const response = await apiClient.post<ApiResponse<NoteWithIdPresent>>("/api/note", data);

  return response.data;
}