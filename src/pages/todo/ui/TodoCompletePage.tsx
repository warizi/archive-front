import { CompletedHistoryInfiniteListCard } from "@/features/todo/get-completed-history";
import Vertical from "@/shared/components/ui/Vertical";

function TodoCompletePage() {
  return (
    <Vertical className="h-screen-no-header p-4">
      <CompletedHistoryInfiniteListCard />
    </Vertical>
  );
};

export default TodoCompletePage;