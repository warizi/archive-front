import type { TodoCategory } from "@/entities/todo";
import { CreateTodoCateForm } from "@/features/todo";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useState } from "react";

interface TodoCateSaveDialogProps {
  children: React.ReactNode;
  defaultValues?: TodoCategory
}

function TodoCateSaveDialog({ children, defaultValues }: TodoCateSaveDialogProps) {
  const [ open, setOpen ] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogTitle>할 일 카테고리 {defaultValues ? "수정" : "추가"}</DialogTitle>
        <DialogDescription>
          카테고리의 세부 정보를 설정하세요.
        </DialogDescription>
        <CreateTodoCateForm
          defaultValues={defaultValues}
          callback={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TodoCateSaveDialog;