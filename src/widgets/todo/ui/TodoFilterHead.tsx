import { FilterCategoryDropdownMenu } from "@/features/category";

function TodoFilterHead() {
  return (
    <div className="h-[50px] w-full flex items-center gap-4 shrink-0 min-h-0">
      <FilterCategoryDropdownMenu />
    </div>
  );
};

export default TodoFilterHead;