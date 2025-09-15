import { Button } from "@/shared/components/ui/button";
import { BookPlus } from "lucide-react";
import { useCreateNoteInFolder } from "../model/createNoteApiHooks";
import { toast } from "sonner";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";

interface CreateNoteInFolderButtonProps {
  folderId: number;
}

function CreateNoteInFolderButton({ 
  folderId 
}: CreateNoteInFolderButtonProps) {
  const { mutate, isPending } = useCreateNoteInFolder(folderId);

  const handleCreateNote = () => {
    mutate({ title: "새 노트", contentJson: "", folderId }, {
      onSuccess: () => {
        toast.success("노트가 생성되었습니다.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          toast.error(message ?? "노트 생성에 실패했습니다.");
        }
      }
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          aria-label="Create Note"
          disabled={isPending}
          onClick={() => handleCreateNote()}
        >
          <BookPlus />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>새 노트</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CreateNoteInFolderButton;