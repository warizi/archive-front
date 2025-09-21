import { CompletedTodoChartBarCard } from "@/features/todo/chart-todo";
import { TodayTodoListCard } from "@/features/todo/list-todo";
import Vertical from "@/shared/components/ui/Vertical";

function TodoWidgets() {
  return (
    <Vertical className="w-full gap-4">
      <TodayTodoListCard />
      <CompletedTodoChartBarCard />
      <div className="grid grid-cols-1 lg:grid-cols-2">
      </div>
    </Vertical>
  );
};

export default TodoWidgets;