import { useGetCategorizedRepeatTodoList, useGetCategorizedTodoList } from "@/features/todo/list-todo";
import TodoListCard from "./TodoListCard";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";

interface CategorizedTodoListProps {
  category: CategoryWithIdPresent
}

function CategorizedTodoList({ category }: CategorizedTodoListProps) {
  const { data } = useGetCategorizedTodoList({ page: 0, size: 20, sort: "id,desc", id: category.id });
  const { data: repeatData } = useGetCategorizedRepeatTodoList({ page: 0, size: 20, sort: "id,desc", id: category.id });
  return (
    <TodoListCard 
      todoList={data?.content || []}
      repeatTodoList={repeatData?.content || []}
      category={category}
    />
  );
};

export default CategorizedTodoList;