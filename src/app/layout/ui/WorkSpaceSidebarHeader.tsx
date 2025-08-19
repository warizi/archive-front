import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import Horizontal from "@/shared/components/ui/Horizontal";
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import Vertical from "@/shared/components/ui/Vertical";
import { Layers, Plus, SquareChartGantt } from "lucide-react";

function WorkSpaceSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-12">
                <Horizontal justify="center" align="center" className="h-12 gap-4">
                  <Layers size={30} />
                  <Vertical className="text-sm">
                    <span className="text-sm">Work space</span>
                    <span className="text-xs text-gray-400">free</span>
                  </Vertical>
                </Horizontal>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-2" side="right">
              <DropdownMenuLabel className="text-xs text-gray-400">
                Workspace
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <SquareChartGantt />
                House
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquareChartGantt />
                Work
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquareChartGantt />
                Friends
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus />
                add
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default WorkSpaceSidebarHeader;