import { type TodoWithIdPresent } from "@/entities/todo";
import { CreateTodoInput } from "@/features/todo/create-todo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import { CategoryTag } from "@/entities/catogory";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import TodoRow from "./TodoRow";

interface TodoListCardProps {
  todoList: TodoWithIdPresent[];
  repeatTodoList?: TodoWithIdPresent[];
  category?: CategoryWithIdPresent;
}

function TodoListCard({ todoList, repeatTodoList, category }: TodoListCardProps) {
  const sortedCompletedList = todoList.sort((a, b) => {
    return (b.completed ? 0 : 1) - (a.completed ? 0 : 1);
  });

  return (
    <Card className="p-2 gap-1 w-[350px] max-h-[calc(100vh-110px)]">
      <CardHeader className="p-2">
        <CardTitle>
          {category ? <div className="flex items-center gap-2"><CategoryTag size={20} category={category} /><span>{category.name}</span></div> : "미분류"}
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
      <CardContent className="p-0 pb-2 flex-1 min-h-0 flex flex-col">
        <ScrollArea className="flex-1 h-full mt-2">
          {
            repeatTodoList && repeatTodoList?.length > 0 && (
              <>
                <Collapsible className="mb-2">
                  <div className="flex w-[332px] items-center justify-between gap-4 px-2 pl-4">
                    <h4 className="text-sm font-semibold">
                      반복 할 일
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="space-y-1">
                      {repeatTodoList.map(todo => (
                        <TodoRow key={todo.id} todo={todo} sheetDisabled={true} />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </>
            )
          }
          <Separator className="my-2"/>
           <div className="space-y-1">
            {
              todoList && todoList.length === 0 ? (
                <EmptyMessageCard message="할일이 없습니다. 할 일을 추가해보세요."/>
              ) : (
                <Collapsible className="mb-2" defaultOpen={true}>
                  <div className="flex items-center justify-between gap-4 px-2 pl-4">
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
                  <CollapsibleContent className="flex flex-col gap-1">
                    {sortedCompletedList.map(todo => (
                      <TodoRow key={todo.id} todo={todo} sheetDisabled={false} />
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TodoListCard;