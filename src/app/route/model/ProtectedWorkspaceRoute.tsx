import type { WorkspaceIdPresent } from "@/entities/workspace";
import { useGetListWorkspaces } from "@/features/workspace/get-workspace";
import { workspaceStore } from "@/shared/config/workspaceStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


function ProtectedWorkspaceRoute() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetListWorkspaces();
  const [initialWorkspace, setInitialWorkspace] = useState<WorkspaceIdPresent | null>(null);

  workspaceStore.subscribe((id: string | null) => {
    const workspace = data?.data.find((ws) => ws.id === id);
    setInitialWorkspace(workspace || null);
    queryClient.clear();
  });

  useEffect(() => {
    const wsId = workspaceStore.get();
    if (wsId) {
      const workspace = data?.data.find((ws) => ws.id === wsId) || null;
      if (workspace) {
        setInitialWorkspace(workspace);
      } else {
        const workspace = data?.data[0] || null;
        if (workspace) {
          workspaceStore.set(workspace.id);
        }
      }
    } else {
      const workspace = data?.data[0] || null;
      if (workspace) {
        workspaceStore.set(workspace.id);
      }
    }
  }, [data]);

  if (isLoading) return null;

  return initialWorkspace ? <Outlet /> : null;
};

export default ProtectedWorkspaceRoute;