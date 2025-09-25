import { type TodoWithIdPresent } from "@/entities/todo";
import { CreateTodoInput } from "@/features/todo/create-todo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import { CategoryTag } from "@/entities/catogory";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import { TodoRow } from "@/features/todo/list-todo";

interface TodoListCardProps {
  todoList: TodoWithIdPresent[];
  repeatTodoList?: TodoWithIdPresent[];
  category?: CategoryWithIdPresent;
}

const importanceOrder = new Map<string, number>([
  ["high", 3],
  ["medium", 2],
  ["low", 1],
  ["none", 0]
]);

function TodoListCard({ todoList, repeatTodoList, category }: TodoListCardProps) {

  const sortedTodoList = todoList.sort((a, b) => {
    return (importanceOrder.get(b?.importance || "none") || 0) - (importanceOrder.get(a.importance || "none") || 0);
  });

  const sortedCompletedList = sortedTodoList.sort((a, b) => {
    return (b.completed ? 0 : 1) - (a.completed ? 0 : 1);
  });
  
  return (
    <Card className="p-2 gap-1 min-w-[350px] w-[350px] max-h-[calc(100vh-110px)]">
      <CardHeader className="p-2 w-full">
        <CardTitle className="max-w-[300px]">
          {category ? (
            <div className="flex items-center gap-2">
              <div className="shrink-0">
                <CategoryTag size={20} category={category}/>
              </div>
              <span className="flex-1 min-w-0 truncate">{category.name}</span>
            </div>
          ) : "미분류"}
        </CardTitle>
          {
            category?.description && (
            <CardDescription>
              {category.description}
            </CardDescription>
          )
        }        
        <CreateTodoInput className="shrink-0 mt-2" category={category}/>
      </CardHeader>
      <CardContent className="p-0 pb-2 flex-1 min-h-0 flex flex-col w-full overflow-y-auto overflow-x-hidden">
        {
          repeatTodoList && repeatTodoList?.length > 0 && (
            <>
              <Collapsible className="mb-2" defaultOpen={true}>
                <div className="flex w-[332px] items-center justify-between gap-4 px-2 pl-4">
                  <h4 className="text-sm font-semibold shrink-0">
                    반복 할 일
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronsUpDown />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="w-[333px] min-w-0">
                  <div className="w-full min-w-0">
                    {repeatTodoList.map(todo => (
                      <TodoRow key={todo.id} todo={todo} sheetDisabled={true} deleteDisabled={true} categoryTagDisplay={false} />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )
        }
        <Separator className="my-2"/>
        <div className="space-y-1 w-full min-w-0">
          {
            todoList && todoList.length === 0 ? (
              <EmptyMessageCard message="할일이 없습니다. 할 일을 추가해보세요."/>
            ) : (
              <Collapsible className="mb-2" defaultOpen={true} asChild>
                <div className="w-full min-w-0">
                  <div className="flex items-center justify-between gap-4 px-2 pl-4 w-full min-w-0">
                    <h4 className="text-sm font-semibold">
                      할 일
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="flex flex-col gap-1 w-[333px] min-w-0">
                    {sortedCompletedList.map(todo => (
                      <TodoRow key={todo.id} todo={todo} sheetDisabled={false} categoryTagDisplay={false}/>
                    ))}
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoListCard;