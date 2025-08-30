import type { Workspace, WorkspaceCreateType } from "@/entities/workspace/model/Workspace";
import { createWorkspaceApi, updateWorkspaceApi } from "../api/saveApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WORKSPACE_QUERY_KEY } from "@/entities/workspace";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: WorkspaceCreateType) => createWorkspaceApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY.ALL });
    },
  });

  return mutation;
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Workspace }) => updateWorkspaceApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY.ALL });
    },
  });

  return mutation;
};
