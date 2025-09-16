import type { WorkspaceIdPresent } from "@/entities/workspace";
import { useGetListWorkspaces } from "../model/getApiHooks";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { SquareChartGantt } from "lucide-react";
import { DeleteWorkspaceDialogButton } from "../../delete-workspace";

interface WorkspaceListTableProps {
  selectedWorkspace: WorkspaceIdPresent | null;
  onWorkspaceSelect: (workspace: WorkspaceIdPresent | null) => void;
}

function WorkspaceListTable({ selectedWorkspace, onWorkspaceSelect }: WorkspaceListTableProps) {

  const { data } = useGetListWorkspaces();

  const handleSelectWorkspace = (workspace: WorkspaceIdPresent) => {
    if (selectedWorkspace?.id === workspace.id) {
      onWorkspaceSelect(null);
    }
    onWorkspaceSelect(workspace);
  };

  return (
    <ScrollArea className="h-[150px] w-full">
      <Table>
        <TableBody>
          {data?.data?.map((workspace) => (
            <TableRow
              key={workspace.id}
              selected={workspace.id === selectedWorkspace?.id}
              className="group"
            >
              <TableCell width={50}>
                <SquareChartGantt />
              </TableCell>
              <TableCell
                onClick={() => handleSelectWorkspace(workspace)}
              >
                {workspace.title}
              </TableCell>
              <TableCell width={20}>
                <DeleteWorkspaceDialogButton workspaceId={workspace.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default WorkspaceListTable;