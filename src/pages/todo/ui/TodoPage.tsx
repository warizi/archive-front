import { useCategoryFilter } from "@/features/category";
import { UNCATEGORIZED_ID } from "@/features/category/model/contants";
import Vertical from "@/shared/components/ui/Vertical";
import { CategorizedTodoListsMapper, TodoFilterHead, UnCategorizedTodoList } from "@/widgets/todo";

function TodoPage() {
  const { selectedCategories } = useCategoryFilter();
  return (
    <Vertical className="h-[calc(100vh-64px)]">
      <TodoFilterHead />
      <div className="flex h-[calc(100vh-114px)] flex-1 gap-4 overflow-auto min-w-0">
        {
          selectedCategories.includes(UNCATEGORIZED_ID) && (
            <UnCategorizedTodoList />
          )
        }
        <CategorizedTodoListsMapper />
      </div>
    </Vertical>
  );
};

export default TodoPage;