import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { FolderPlus } from "lucide-react";
import { useCreateNoteFolder } from "../model/createNoteFolderApiHooks";
import { toast } from "sonner";
import axios from "axios";

function CreateFolderButton() {
  const { mutate, isPending } = useCreateNoteFolder();

  const handleCreateFolder = () => {
    mutate({ name: "새 폴더", parentId: null }, {
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} size={"icon"} onClick={handleCreateFolder} disabled={isPending}>
          <FolderPlus />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>새 폴더</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CreateFolderButton;