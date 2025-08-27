import { TODO_REPEAT_FREQUENCY } from "@/entities/todo";
import { useGetFrequencyRepeatTodoList } from "@/features/todo/list-todo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import TodoRow from "./TodoRow";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useCategoryFilter } from "@/features/category";
import { UNCATEGORIZED_ID } from "@/features/category/model/contants";
interface RepeatTodoListCardProps {
  repeatFrequency: keyof typeof TODO_REPEAT_FREQUENCY;
}

const FREQUENCY_TITLE = {
  [TODO_REPEAT_FREQUENCY.DAILY]: "매일",
  [TODO_REPEAT_FREQUENCY.WEEKLY]: "매주",
  [TODO_REPEAT_FREQUENCY.MONTHLY]: "매달",
  [TODO_REPEAT_FREQUENCY.YEARLY]: "매년",
}

const FREQUENCY_DESCRIPTION = {
  [TODO_REPEAT_FREQUENCY.DAILY]: "매일 반복",
  [TODO_REPEAT_FREQUENCY.WEEKLY]: "매주 반복",
  [TODO_REPEAT_FREQUENCY.MONTHLY]: "매달 반복",
  [TODO_REPEAT_FREQUENCY.YEARLY]: "매년 반복",
}
function RepeatTodoListCard({ repeatFrequency }: RepeatTodoListCardProps) {
  const { data } = useGetFrequencyRepeatTodoList({
    page: 0,
    size: 100,
    frequency: repeatFrequency
  });

  const { selectedCategories } = useCategoryFilter();

  const filteredData = data?.content.filter(todo => {
    if (selectedCategories.length === 0) return false;
    if (selectedCategories.includes(UNCATEGORIZED_ID) && !todo?.category) return true;
    const todoCategoryId = todo?.category?.id || -1;
    return selectedCategories.includes(todoCategoryId);
  }) || [];

  return (
    <Card className="p-2 gap-1 min-w-[350px] w-[350px] max-h-[calc(100vh-110px)]">
      <CardHeader className="p-2">
        <CardTitle>
          {FREQUENCY_TITLE[repeatFrequency]}
        </CardTitle>
        <CardDescription>
          {FREQUENCY_DESCRIPTION[repeatFrequency]}
        </CardDescription>
    </CardHeader>
    <CardContent className="p-0 pb-2 flex-1 min-h-0 flex flex-col">
      <ScrollArea className="flex-1 h-full mt-2">
        {filteredData.map(todo => (
          <TodoRow key={todo.id} todo={todo} sheetDisabled={false} checkBoxDisabled={true} />
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
  );
};

export default RepeatTodoListCard;