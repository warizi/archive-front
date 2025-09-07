import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useDeleteNote } from "../model/deleteNoteApiHooks";
import { toast } from "sonner";
import axios from "axios";

interface DeleteNoteIconButtonProps {
  noteId: number;
}

function DeleteNoteIconButton({ noteId }: DeleteNoteIconButtonProps) {
  const { mutate } = useDeleteNote();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    mutate(noteId, {
      onSuccess: () => {
        toast.success("노트가 삭제되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          toast.error(message || "노트 삭제에 실패했습니다.");
        }
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Trash2 size={16}                                             
          className="
            h-4 w-4 transition-colors
            text-zinc-400 dark:text-zinc-500
            group-hover:text-red-600 dark:group-hover:text-red-400
            active:text-red-700 dark:active:text-red-300
            hover:cursor-pointer
          "
          strokeWidth={1.3}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            노트 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNoteIconButton;