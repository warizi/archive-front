import { useGetUnCategorizedRepeatTodoList, useGetUnCategorizedTodoList } from "@/features/todo/list-todo";
import TodoListCard from "./TodoListCard";

function UnCategorizedTodoList() {
  const { data } = useGetUnCategorizedTodoList({ page: 0, size: 100, sort: "id,desc" });
  const { data: repeatData } = useGetUnCategorizedRepeatTodoList({ page: 0, size: 100, sort: "id,desc" });

  return (
    <TodoListCard
      todoList={data?.content || []}
      repeatTodoList={repeatData?.content || []}
    />
  );
};

export default UnCategorizedTodoList;