import type { NoteType, NoteWithIdPresent } from "@/entities/note";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const updateNote = async (id: number, note: NoteType): Promise<ApiResponse<NoteWithIdPresent>> => {
  const response = await apiClient.put<ApiResponse<NoteWithIdPresent>>(`/api/note/${id}`, note);

  return response.data;
}

export const updateNoteMoveInFolder = async (folderId: number, noteList: NoteWithIdPresent[]): Promise<ApiResponse<NoteWithIdPresent[]>> => {
  const response = await apiClient.put<ApiResponse<NoteWithIdPresent[]>>(`/api/note/folder/${folderId}/move`, noteList);

  return response.data;
}