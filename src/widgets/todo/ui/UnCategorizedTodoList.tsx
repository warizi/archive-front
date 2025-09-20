import { useGetUnCategorizedRepeatTodoList, useGetUnCategorizedTodoList } from "@/features/todo/list-todo";
import { TodoListCard } from "@/features/todo/list-todo";

function UnCategorizedTodoList() {
  const { data } = useGetUnCategorizedTodoList({ page: 0, size: 100, sort: "id,desc" });
  const { data: repeatData } = useGetUnCategorizedRepeatTodoList();

  return (
    <TodoListCard
      todoList={data?.content || []}
      repeatTodoList={repeatData?.data || []}
    />
  );
};

export default UnCategorizedTodoList;