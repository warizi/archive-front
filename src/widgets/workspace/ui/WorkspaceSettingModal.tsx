import type { WorkspaceIdPresent } from "@/entities/workspace";
import { WorkspaceListTable } from "@/features/workspace/get-workspace";
import { CreateWorkspaceFormCard, UpdateWorkspaceFormCard } from "@/features/workspace/save-workspace";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import Vertical from "@/shared/components/ui/Vertical";
import { DialogTitle, type DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";

function WorkspaceSettingModal({
  open,
  onOpenChange
}: DialogProps) {
  const [ selectedWorkspace, setSelectedWorkspace ] = useState<WorkspaceIdPresent | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="min-w-[400px]">
        <DialogHeader className="h-fit">
          <DialogTitle>
            워크스페이스 설정
          </DialogTitle>
        </DialogHeader>
        <Vertical className="gap-2">
          {
            !selectedWorkspace ? (
              <CreateWorkspaceFormCard />
            ) : (
              <UpdateWorkspaceFormCard defaultValues={selectedWorkspace} />
            )
          }
          <Separator orientation="horizontal" />
          <WorkspaceListTable
            selectedWorkspace={selectedWorkspace}
            onWorkspaceSelect={setSelectedWorkspace}
          />
          <Button
            onClick={() => setSelectedWorkspace(null)}
            disabled={!selectedWorkspace}
          >
            추가하기
          </Button>
        </Vertical>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceSettingModal;