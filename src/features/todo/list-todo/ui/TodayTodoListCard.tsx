import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useGetTodayAllTodoList } from "../model/todoApiHooks";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import TodoRow from "./TodoRow";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

const importanceOrder = new Map<string, number>([
  ["high", 3],
  ["medium", 2],
  ["low", 1],
  ["none", 0]
]);

function TodayTodoListCard() {
  const { data } = useGetTodayAllTodoList();
  const todoList = data?.data ?? [];
  const sortedTodoList = todoList.sort((a, b) => {
    return (importanceOrder.get(b?.importance || "none") || 0) - (importanceOrder.get(a.importance || "none") || 0);
  });
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
          <CardContent className="max-h-[300px] overflow-auto">
            {
              sortedTodoList.length === 0 && (
                <EmptyMessageCard message="오늘 할 일이 없습니다."/>
              )
            }
            {
              sortedTodoList.map((todo) => (
                <TodoRow key={todo.id} todo={todo} sheetDisabled deleteDisabled/>
              ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default TodayTodoListCard;