import { useCategoryFilter } from "@/features/category";
import { UNCATEGORIZED_ID } from "@/features/category/model/contants";
import Horizontal from "@/shared/components/ui/Horizontal";
import Vertical from "@/shared/components/ui/Vertical";
import { CategorizedTodoListsMapper, TodoFilterHead, UnCategorizedTodoList } from "@/widgets/todo";

function TodoPage() {
  const { getSelectedCategories } = useCategoryFilter();
  return (
    <Vertical className="h-screen-no-header px-4 ">
      <TodoFilterHead />
      <div className="flex h-[calc(100vh-94px)] flex-1 gap-4 w-full min-w-0">
        <Horizontal className="overflow-x-auto w-full h-full gap-4">
          {
            getSelectedCategories().includes(UNCATEGORIZED_ID) && (
              <UnCategorizedTodoList />
            )
          }
          <CategorizedTodoListsMapper />
        </Horizontal>
      </div>
    </Vertical>
  );
};

export default TodoPage;