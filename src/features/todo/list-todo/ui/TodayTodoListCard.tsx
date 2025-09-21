import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useGetTodayAllTodoList } from "../model/todoApiHooks";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import TodoRow from "./TodoRow";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

function TodayTodoListCard() {
  const { data } = useGetTodayAllTodoList();
  const todoList = data?.data ?? [];

  console.log("TodayTodoListCard - todoList:", todoList);
  return (
    <Collapsible defaultOpen={true}>
      <Card>
        <CardHeader>
          <CardTitle>오늘의 할 일</CardTitle>
          <CardDescription>
            오늘 반복 할 일, 오늘 날짜에 해당되는 할 일
          </CardDescription>
          <CardAction>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0" aria-label="접기/펼치기">
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </CardAction>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="max-h-[300px]">
            <ScrollArea className="h-full">
              {
                todoList.length === 0 && (
                  <EmptyMessageCard message="오늘 할 일이 없습니다."/>
                )
              }
              {
                todoList.map((todo) => (
                  <TodoRow key={todo.id} todo={todo} sheetDisabled deleteDisabled/>
                ))}
            </ScrollArea>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default TodayTodoListCard;