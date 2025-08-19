import type { TodoCategory } from "@/entities/todo";
import { CreateTodoCateForm, useTodoCateDeleteMutation } from "@/features/todo";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/shared/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { ContextMenuSeparator } from "@radix-ui/react-context-menu";
import axios from "axios";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TodoCateContextMenuProps {
  todoCategory: TodoCategory;
  children: React.ReactNode;
}

function TodoCateContextMenu({ todoCategory, children }: TodoCateContextMenuProps) {
  const { mutate } = useTodoCateDeleteMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const id = todoCategory.id;
    if (!id) {
      return toast.error("할 일 카테고리 ID가 없습니다.");
    }

    mutate(id, {
      onSuccess: () => {
        toast.success("할 일 카테고리가 삭제되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "할 일 카테고리 삭제에 실패했습니다.";
          toast.error(message);
        }
      }
    });
  };

  return (
    <ContextMenu>
      <AlertDialog>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <ContextMenuTrigger asChild>
            {children}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-50">
            <DialogTrigger asChild>
              <ContextMenuItem>
                <Pen />
                <span>수정</span>
              </ContextMenuItem>
            </DialogTrigger>
            <ContextMenuSeparator />
              <AlertDialogTrigger className="w-full">
                <ContextMenuItem>
                    <Trash2 color="red" />
                    <span className="text-red-500">삭제</span>
                </ContextMenuItem>
              </AlertDialogTrigger>
          </ContextMenuContent>
          <AlertDialogContent className="w-80 p-4">
            <AlertDialogHeader>
              <AlertDialogTitle>할 일 카테고리를 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  해당 카테고리의 모든 할 일이 삭제됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete()}>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          <DialogContent className="w-80">
            <DialogTitle>할 일 카테고리 수정</DialogTitle>
            <DialogDescription>
              카테고리의 세부 정보를 설정하세요.
            </DialogDescription>
            <CreateTodoCateForm 
              defaultValues={todoCategory}
              callback={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </AlertDialog>
    </ContextMenu>
  );
};

export default TodoCateContextMenu;