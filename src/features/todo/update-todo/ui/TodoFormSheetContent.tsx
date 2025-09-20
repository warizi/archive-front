import { UpdateTodoForm } from "@/features/todo/update-todo";
import { useGetTodo } from "@/features/todo/update-todo/model/todoApiHooks";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";

interface TodoFormSheetProps {
  todoId?: number,
  checkBoxDisabled?: boolean
  disable?: boolean; // true면 수정 불가 (완료된 할 일 등)
  isOpen?: boolean; // open 상태를 부모 컴포넌트에서 제어
}

function TodoFormSheet({ todoId, checkBoxDisabled, disable, isOpen = false }: TodoFormSheetProps) {
  const { data, isSuccess } = useGetTodo(todoId, { enabled: isOpen && !!todoId });
  return (
    <SheetContent side="right" className="sm:max-w-[500px] w-full">
      <SheetHeader>
        <SheetTitle>TODO</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="px-4 pb-2">
          {
            isSuccess && (
              <UpdateTodoForm defaultValues={data?.data} checkBoxDisabled={checkBoxDisabled} disable={disable}/>
            )
          }
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