import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteWorkspace } from "../model/deleteApiHooks";
import axios from "axios";
import { toast } from "sonner";
import { workspaceStore } from "@/shared/config/workspaceStore";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteWorkspaceDialogButtonProps {
  workspaceId: string;
}

function DeleteWorkspaceDialogButton({ workspaceId }: DeleteWorkspaceDialogButtonProps) {
  const { mutate } = useDeleteWorkspace();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutate(workspaceId, {
      onSuccess: () => {
        const currentWorkspaceId = workspaceStore.get();
        if (currentWorkspaceId === workspaceId) {
          workspaceStore.set(null);
          queryClient.clear();
        }
        toast.success("워크스페이스가 성공적으로 삭제되었습니다.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "워크스페이스 삭제에 실패했습니다.";
          toast.error(message);
        }
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"xs"}
          aria-label="삭제"
          className="
            opacity-0 pointer-events-none
            group-hover:opacity-100 group-hover:pointer-events-auto
            group-data-[state=selected]:opacity-100 group-data-[state=selected]:pointer-events-auto
            focus:opacity-100 focus:pointer-events-auto
            transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Trash2
            className="
              h-4 w-4 transition-colors
              text-zinc-400 dark:text-zinc-500
              group-hover:text-red-600 dark:group-hover:text-red-400
              active:text-red-700 dark:active:text-red-300
            "
            strokeWidth={1.3}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            선택한 워크스페이스를 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={handleDelete}
          >
            <Button variant="destructive" className="text-white">
              삭제
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkspaceDialogButton;