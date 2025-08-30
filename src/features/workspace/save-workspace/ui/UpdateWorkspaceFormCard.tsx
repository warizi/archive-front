import type { Workspace, WorkspaceIdPresent } from "@/entities/workspace";
import { useUpdateWorkspace } from "../model/saveHooks";
import { toast } from "sonner";
import axios from "axios";
import WorkspaceFormCard from "./WorkspaceFormCard";

interface UpdateWorkspaceFormCardProps {
  defaultValues: WorkspaceIdPresent
}
function UpdateWorkspaceFormCard({ defaultValues }: UpdateWorkspaceFormCardProps) {
  const { mutate } = useUpdateWorkspace();

  const onSubmit = (data: Workspace) => {
    mutate({ id: defaultValues.id, data }, {
      onSuccess: () => {
        toast.success(`워크스페이스가 수정되었습니다.`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "워크스페이스 수정에 실패했습니다.";
          toast.error(message);
        }
      }
    });
  }
  return (
    <WorkspaceFormCard 
      title="수정하기"
      buttonTitle="수정"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default UpdateWorkspaceFormCard;