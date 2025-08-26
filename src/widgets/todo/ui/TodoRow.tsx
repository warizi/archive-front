import { Todo, TODO_QUERY_KEY, type TodoWithIdPresent } from "@/entities/todo";
import { TodoCheckbox } from "@/features/todo/complete-todo";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { TodoFormSheetContent } from "..";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { TodoSubCheckbox } from "@/features/todo/complete-todo-sub";
import { cn } from "@/shared/lib/utils";
import { DeleteTodoIconButton } from "@/features/todo/delete-todo";

interface TodoRowProps {
  todo: TodoWithIdPresent;
  sheetDisabled: boolean;
}

function TodoRow({ todo, sheetDisabled }: TodoRowProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  const queryClient = useQueryClient();

  const handleCloseEffect = (isOpen: boolean) => {
    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  }

  const sortedTodoSub = todo?.subTodo?.slice().sort((a, b) => (a.id || 0) - (b.id || 0)) || [];

  return (
    <Sheet onOpenChange={handleCloseEffect}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div>
          <div className="flex w-[332px] gap-2 hover:bg-muted px-2 rounded-md group transition-colors duration-500">
            <TodoCheckbox id={todo.id} completed={todo.completed} className="shrink-0 mt-[10px]"/>
            <SheetTrigger asChild>
              <div className="flex-1 min-w-0">
              <Todo data={todo} className="w-full overflow-hidden"/>
              </div>
            </SheetTrigger>
            {
              todo.subTodo && todo.subTodo.length > 0 && (
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    {isOpen ? <ChevronUp/> : <ChevronDown />}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              )
            }
            <DeleteTodoIconButton todoId={todo.id} className="shrink-0" />
            {/* sub todo */}
          </div>
          {
            sortedTodoSub.length > 0 && (
              <CollapsibleContent className="pl-4">
                {
                  sortedTodoSub.map((subTodo) => (
                    <div className="flex gap-4 items-center p-3" key={subTodo.id}>
                      {
                        subTodo?.id && (
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
        {/* form */}
        { !sheetDisabled && <TodoFormSheetContent todoId={todo.id} />}
      </Collapsible>
    </Sheet>
  );
};

export default TodoRow;