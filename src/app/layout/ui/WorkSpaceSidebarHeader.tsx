import type { WorkspaceIdPresent } from "@/entities/workspace";
import { useGetListWorkspaces } from "@/features/workspace/get-workspace";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import Horizontal from "@/shared/components/ui/Horizontal";
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import Vertical from "@/shared/components/ui/Vertical";
import { workspaceStore } from "@/shared/config/workspaceStore";
import { WorkspaceSettingModal } from "@/widgets/workspace";
import { ChevronsUpDown, Edit, Layers, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";

function WorkSpaceSidebarHeader() {
  const { data } = useGetListWorkspaces();
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceIdPresent | null>(null);

  const [isOpenWorkspaceModal, setIsOpenWorkspaceModal] = useState<boolean>(false);


  const handleSelectWorkspace = (workspaceId: string) => {
    workspaceStore.set(workspaceId);
  };

  workspaceStore.subscribe((workspaceId) => {
    const workspace = data?.data.find(ws => ws.id === workspaceId);
    setSelectedWorkspace(workspace || null);
  });

  useEffect(() => {
    const wsId = workspaceStore.get();
    if (wsId) {
      const workspace = data?.data.find(ws => ws.id === wsId) || null;
      setSelectedWorkspace(workspace);
    } else {
      const workspace = data?.data[0] || null;
      if (workspace) {
        workspaceStore.set(workspace.id);
      }
    }
  }, [data])

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-12 flex justify-between w-full items-center cursor-pointer">
                <Horizontal justify="center" align="center" className="h-12 gap-4">
                  <Layers size={30} />
                  <Vertical className="text-sm">
                    <span className="text-sm">{selectedWorkspace?.title}</span>
                  </Vertical>
                </Horizontal>
                <ChevronsUpDown />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-2" side="bottom" sideOffset={0} align="start" alignOffset={0}>
              <DropdownMenuLabel className="text-xs text-gray-400">워크스페이스</DropdownMenuLabel>
              {
                data?.data?.map((workspace) => (
                  <DropdownMenuItem key={workspace.id} onClick={() => handleSelectWorkspace(workspace.id)}>
                    <SquareChartGantt />
                    {workspace.title}
                  </DropdownMenuItem>
                ))
              }
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpenWorkspaceModal(true)}>
                <Edit />
                워크스페이스 설정
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <WorkspaceSettingModal
        open={isOpenWorkspaceModal}
        onOpenChange={setIsOpenWorkspaceModal}
      />
    </SidebarHeader>
  );
};

export default WorkSpaceSidebarHeader;