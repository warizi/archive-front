import Vertical from "@/shared/components/ui/Vertical";
import { RepeatTodoListCardList, TodoFilterHead } from "@/widgets/todo";

function TodoRepeatPage() {
  return (
    <Vertical className="h-screen-no-header px-4">
      <TodoFilterHead />
      <div className="flex h-[calc(100vh-94px)] flex-1 gap-4 overflow-x-scroll min-w-0">
        <RepeatTodoListCardList />
      </div>
    </Vertical>
  );
};

export default TodoRepeatPage;