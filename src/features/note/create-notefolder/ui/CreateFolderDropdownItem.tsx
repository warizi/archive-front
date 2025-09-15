import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateNoteFolder } from "../model/createNoteFolderApiHooks";
import axios from "axios";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";

interface CreateFolderDropdownItemProps {
  parentId: number;
}

function CreateFolderDropdownItem({ parentId }: CreateFolderDropdownItemProps) {
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
    <DropdownMenuItem onClick={handleCreateFolder} disabled={isPending}>
      <Plus />
      <span>새 폴더</span>
    </DropdownMenuItem>
  );
};

export default CreateFolderDropdownItem;