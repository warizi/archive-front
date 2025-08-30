import type { WorkspaceIdPresent } from "@/entities/workspace";
import { WorkspaceListTable } from "@/features/workspace/get-workspace";
import { CreateWorkspaceFormCard, UpdateWorkspaceFormCard } from "@/features/workspace/save-workspace";
import { Dialog, DialogContent, DialogHeader } from "@/shared/components/ui/dialog";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Separator } from "@/shared/components/ui/separator";
import { DialogTitle, type DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";

function WorkspaceSettingModal({
  open,
  onOpenChange
}: DialogProps) {
  const [ selectedWorkspace, setSelectedWorkspace ] = useState<WorkspaceIdPresent | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="min-w-[800px]">
        <DialogHeader className="h-fit">
          <DialogTitle>
            워크스페이스 설정
          </DialogTitle>
        </DialogHeader>
        <Horizontal className="gap-2">
          {
            !selectedWorkspace ? (
              <CreateWorkspaceFormCard />
            ) : (
              <UpdateWorkspaceFormCard defaultValues={selectedWorkspace} />
            )
          }
          <Separator orientation="vertical" />
          <WorkspaceListTable
            selectedWorkspace={selectedWorkspace}
            onWorkspaceSelect={setSelectedWorkspace}
          />
        </Horizontal>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceSettingModal;