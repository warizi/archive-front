import type { TodoWithIdPresent } from "@/entities/todo";
import { UpdateTodoForm } from "@/features/todo/update-todo";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";

interface TodoFormSheetProps {
  todo?: TodoWithIdPresent
}

function TodoFormSheet({ todo }: TodoFormSheetProps) {
  return (
    <SheetContent side="right" className="w-[600px] sm:w-[600px]">
      <SheetHeader>
        <SheetTitle>TODO</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="px-4 pb-2">
        <UpdateTodoForm defaultValues={todo}/>
        </div>
      </ScrollArea>
      <SheetFooter className="sticky bottom-0 left-2 bg-inherit">
        <SheetClose asChild>
          <Button variant="outline">닫기</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default TodoFormSheet;