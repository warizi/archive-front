import { CountNoteCard } from "@/features/note/count-note";
import { CountCompletedTodoCard, CountRepeatTodoCard, CountUncompletedTodoCard } from "@/features/todo/count-todo";

function CountWidget() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CountCompletedTodoCard />
      <CountUncompletedTodoCard />
      <CountRepeatTodoCard />
      <CountNoteCard />
    </div>
  );
};

export default CountWidget;