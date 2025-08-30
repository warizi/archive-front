import type { Workspace } from "@/entities/workspace";
import { useCreateWorkspace } from "../model/saveHooks";
import { toast } from "sonner";
import axios from "axios";
import WorkspaceFormCard from "./WorkspaceFormCard";

function CreateWorkspaceFormCard() {
  const { mutate } = useCreateWorkspace();

  const onSubmit = (data: Workspace) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`워크스페이스가 생성되었습니다.`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "워크스페이스 생성에 실패했습니다.";
          toast.error(message);
        }
      }
    });
  };
  return (
    <WorkspaceFormCard 
      title="추가하기"
      buttonTitle="추가"
      onSubmit={onSubmit}
    />
  );
};

export default CreateWorkspaceFormCard;