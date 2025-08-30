import type { WorkspaceIdPresent } from "@/entities/workspace";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export const getListWorkspaces = async (): Promise<ApiResponse<WorkspaceIdPresent[]>> => {
  const response = await apiClient.get<ApiResponse<WorkspaceIdPresent[]>>("/api/workspace");

  return response.data;
};