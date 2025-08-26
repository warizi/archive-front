import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteTodoMutate } from "../model/deleteTodoApiHooks";
import { toast } from "sonner";
import axios from "axios";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";

interface DeleteTodoIconButtonProps {
  todoId: number;
  className?: string;
}

function DeleteTodoIconButton({ todoId, className }: DeleteTodoIconButtonProps) {
  const { mutate: deleteTodoMutate } = useDeleteTodoMutate();

  const handleDeleteTodo = (todoId: number) => {
    deleteTodoMutate(todoId, {
      onSuccess: () => {
        toast.success("할 일이 삭제되었습니다.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          toast.error(message);
        }
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
        >
          <Trash2
            strokeWidth={1.5}
            className="
              h-4 w-4 transition-colors
              text-zinc-400 dark:text-zinc-500
              group-hover:text-red-600 dark:group-hover:text-red-400
              active:text-red-700 dark:active:text-red-300"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>할 일 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">
              취소
            </Button>
          </AlertDialogCancel>
          <Button variant="destructive" onClick={() => handleDeleteTodo(todoId)}>
            삭제
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodoIconButton;