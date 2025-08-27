import Vertical from "@/shared/components/ui/Vertical";
import { RepeatTodoListCardList, TodoFilterHead } from "@/widgets/todo";

function TodoRepeatPage() {
  return (
    <Vertical className="h-[calc(100vh-64px)]">
      <TodoFilterHead />
      <div className="flex h-[calc(100vh-114px)] flex-1 gap-4 overflow-x-scroll min-w-0">
        <RepeatTodoListCardList />
      </div>
    </Vertical>
  );
};

export default TodoRepeatPage;