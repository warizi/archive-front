import type { NoteFolder, NoteFolderWithIdPresent } from "@/entities/note/model/NoteFolder";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const updateNoteFolder = async (id: number, name: string): Promise<ApiResponse<NoteFolder>> => {
  const response = await apiClient.put<ApiResponse<NoteFolder>>(`/api/noteFolder/${id}`, {
    name
  });

  return response.data;
}

export const updateNoteFolderMove = async (noteFolderList: NoteFolderWithIdPresent[]): Promise<ApiResponse<NoteFolderWithIdPresent[]>> => {
  const response = await apiClient.post<ApiResponse<NoteFolderWithIdPresent[]>>("/api/noteFolder/move", noteFolderList);

  return response.data;
}