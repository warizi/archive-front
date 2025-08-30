import type { Workspace, WorkspaceCreateType, WorkspaceIdPresent } from "@/entities/workspace/model/Workspace";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const createWorkspaceApi = async (workspace: WorkspaceCreateType): Promise<ApiResponse<WorkspaceIdPresent>> => {
  const response = await apiClient.post<ApiResponse<WorkspaceIdPresent>>(`/api/workspace`, workspace);

  return response.data;
}

export const updateWorkspaceApi = async (id: string, workspace: Workspace): Promise<ApiResponse<WorkspaceIdPresent>> => {
  const response = await apiClient.put<ApiResponse<WorkspaceIdPresent>>(`/api/workspace/${id}`, workspace);

  return response.data;
}