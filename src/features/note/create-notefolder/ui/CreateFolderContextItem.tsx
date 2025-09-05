import { ContextMenuItem } from "@/shared/components/ui/context-menu";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateNoteFolder } from "../model/createNoteFolderApiHooks";
import axios from "axios";

interface CreateFolderContextItemProps {
  parentId: number;
}

function CreateFolderContextItem({ parentId }: CreateFolderContextItemProps) {
    const { mutate, isPending } = useCreateNoteFolder();

  const handleCreateFolder = () => {
    mutate({ name: "새 폴더", parentId }, {
      onSuccess: () => {
        toast.success("새 폴더가 생성되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "폴더 생성에 실패했습니다.");
        }
      }
    });
  };

  return (
    <ContextMenuItem onClick={handleCreateFolder} disabled={isPending}>
      <Plus />
      <span>새 폴더</span>
    </ContextMenuItem>
  );
};

export default CreateFolderContextItem;