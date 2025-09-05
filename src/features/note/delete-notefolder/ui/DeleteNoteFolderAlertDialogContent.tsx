import type { NoteFolderWithIdPresent } from "@/entities/note";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useDeleteNoteFolder } from "../model/deleteNoteFolderApiHooks";
import axios from "axios";

interface DeleteNoteFolderAlertDialogContentProps {
  noteFolder: NoteFolderWithIdPresent;
}

function DeleteNoteFolderAlertDialogContent({
  noteFolder
}: DeleteNoteFolderAlertDialogContentProps) {
  const { mutate } = useDeleteNoteFolder();

  const handleDelete = () => {
    mutate(noteFolder.id, {
      onSuccess: () => {
        toast.success(`폴더 "${noteFolder.name}" 이(가) 삭제되었습니다.`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          toast.error(message ?? "폴더 삭제에 실패했습니다.");
        }
      }
    });
  };
  return (
    <AlertDialogContent>
      <AlertDialogTitle>폴더 삭제</AlertDialogTitle>
      <AlertDialogDescription>
        이 폴더를 삭제하시겠습니까? 하위 폴더와 노트가 함께 삭제됩니다.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction asChild onClick={handleDelete}>
          <Button variant="destructive" className="text-white">
            삭제
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteNoteFolderAlertDialogContent;