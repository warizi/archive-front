import type { NoteWithIdPresent } from "@/entities/note"
import { apiClient } from "@/shared/config/axiosClient"
import type { ApiResponse } from "@/shared/type/response"

export const getNoteListInFolder = async (folderId: number): Promise<ApiResponse<NoteWithIdPresent[]>> => {
  const response = await apiClient.get<ApiResponse<NoteWithIdPresent[]>>(`/api/note/folder/${folderId}`);
  
  return response.data;
}

export const getRecentNoteList = async (): Promise<ApiResponse<NoteWithIdPresent[]>> => {
  const response = await apiClient.get<ApiResponse<NoteWithIdPresent[]>>(`/api/note/recent`);
  
  return response.data;
}