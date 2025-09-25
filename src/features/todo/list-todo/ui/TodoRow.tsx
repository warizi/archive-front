import { Todo, TODO_QUERY_KEY, type TodoWithIdPresent } from "@/entities/todo";
import { TodoCheckbox } from "@/features/todo/complete-todo";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { TodoFormSheetContent } from "@/features/todo/update-todo";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { TodoSubCheckbox } from "@/features/todo/complete-todo-sub";
import { cn } from "@/shared/lib/utils";
import { DeleteTodoIconButton } from "@/features/todo/delete-todo";
import Horizontal from "@/shared/components/ui/Horizontal";

interface TodoRowProps {
  todo: TodoWithIdPresent;
  sheetDisabled: boolean;
  checkBoxDisabled?: boolean; // true면 체크박스 숨김 (완료된 할 일 등)
  deleteDisabled?: boolean; // true면 삭제 버튼 숨김 (반복 할 일 등)
  categoryTagDisplay?: boolean; // categoryTag 표시 여부, 기본값 true
  editDisabled?: boolean; // true면 수정 버튼 숨김 (완료된 할 일 등)
}

function TodoRow({ todo, sheetDisabled, checkBoxDisabled, deleteDisabled, categoryTagDisplay = true, editDisabled }: TodoRowProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isSheetOpen, setIsSheetOpen ] = useState(false);

  const queryClient = useQueryClient();

  const handleCloseEffect = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  }

  const sortedTodoSub = todo?.subTodo?.slice().sort((a, b) => (a.id || 0) - (b.id || 0)) || [];

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleCloseEffect}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
        <div className="w-full min-w-0">
          <div className="flex min-w-0 w-full gap-2 hover:bg-muted px-2 rounded-md group transition-colors duration-500">
            { !checkBoxDisabled && <TodoCheckbox id={todo.id} completed={todo.completed} className="shrink-0 mt-[10px]"/>}
            <SheetTrigger asChild>
              <div 
                aria-label={`할 일 상세 열기: ${todo.title}`}
                aria-describedby={`todo-desc-${todo.id}`}
                className="flex-1 min-w-0 overflow-hidden w-full"
              >
              <Todo data={todo} className="w-full overflow-hidden" categoryTagDisplay={categoryTagDisplay} />
              </div>
            </SheetTrigger>
            {/* form */}
            { !sheetDisabled && <TodoFormSheetContent isOpen={isSheetOpen} checkBoxDisabled={checkBoxDisabled} todoId={todo.id} disable={editDisabled} /> }
            <Horizontal>
              {
                todo.subTodo && todo.subTodo.length > 0 && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0" aria-label={isOpen ? "접기" : "펼치기"}>
                      {isOpen ? <ChevronUp/> : <ChevronDown />}
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                )
              }
              {!deleteDisabled && <DeleteTodoIconButton todoId={todo.id} className="shrink-0" />}
            </Horizontal>
          </div>
          {/* sub todo */}
          {
            sortedTodoSub.length > 0 && (
              <CollapsibleContent className="pl-4">
                {
                  sortedTodoSub.map((subTodo) => (
                    <div className="flex gap-4 items-center p-3" key={subTodo.id}>
                      {
                        !checkBoxDisabled && subTodo?.id && (
                          <TodoSubCheckbox
                            id={subTodo.id}
                            completed={subTodo.completed}
                            parentId={todo.id}
                          />
                        )
                      }
                      <span className={cn("text-xs", {"line-through text-gray-600": subTodo.completed})}>{subTodo.title}</span>
                    </div>
                  ))
                }
              </CollapsibleContent>
            )
          }
        </div>
      </Collapsible>
    </Sheet>
  );
};

export default TodoRow;