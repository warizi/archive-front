import { useGetCategoryListQuery } from "@/features/category/model/categoryApiHooks";
import CategorizedTodoList from "./CategorizedTodoList";
import { useCategoryFilter } from "@/features/category";

function CategorizedTodoListsMapper() {
  const { data } = useGetCategoryListQuery({
    page: 0,
    size: 100,
    sort: "id,sortOrder"
  });
  const { getSelectedCategories } = useCategoryFilter();

  const sortedCategories = data?.content.slice().sort((a, b) =>  (b?.order || 0) - (a?.order || 0));
  const filteredCategories = sortedCategories?.filter(category => getSelectedCategories().includes(category.id));

  return (
    <div className="max-h-[calc(100vh-114px)] flex gap-4">
      {filteredCategories?.map((category) => (
        <CategorizedTodoList key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategorizedTodoListsMapper;