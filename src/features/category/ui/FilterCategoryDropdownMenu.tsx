import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { useGetCategoryListQuery } from "../model/categoryApiHooks";
import { Filter } from "lucide-react";
import { CategoryTag } from "@/entities/catogory";
import { useCategoryFilter } from "../model/useCategoryFilter";
import { UNCATEGORIZED_ID } from "../model/contants";
import Horizontal from "@/shared/components/ui/Horizontal";
import { useEffect } from "react";

function FilterCategoryDropdownMenu() {
  const { data } = useGetCategoryListQuery({
    page: 0,
    size: 100,
    sort: "id,sortOrder"
  });

  const { 
    getSelectedCategories,
    isSelectedCategory, 
    addSelectedCategory, 
    removeSelectedCategory, 
    removeDirtyCategories 
  } = useCategoryFilter();

  const handleSelectCategoryChange = (categoryId: number) => {
    const allList = data?.content.map(category => category.id) || [];
    removeDirtyCategories([UNCATEGORIZED_ID, ...allList]);

    if (isSelectedCategory(categoryId)) {
      removeSelectedCategory(categoryId);
    } else {
      addSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
    const allList = data?.content.map(category => category.id);
    // 카테고리가 없을 경우 미분류 항상 노출
    if (allList && allList.length === 0) {
      addSelectedCategory(UNCATEGORIZED_ID);
    }
  }, [addSelectedCategory, data, removeDirtyCategories]);

  return (
    <Horizontal align="center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Filter />
            카테고리 필터
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuLabel>카테고리 선택</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={isSelectedCategory(UNCATEGORIZED_ID)}
            onCheckedChange={() => handleSelectCategoryChange(UNCATEGORIZED_ID)}
          >
            미분류
          </DropdownMenuCheckboxItem>
          {data?.content?.map(category => (
            <DropdownMenuCheckboxItem key={category.id}
              checked={isSelectedCategory(category.id)}
              onCheckedChange={() => handleSelectCategoryChange(category.id)}
            >
              <CategoryTag category={category} />
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Horizontal className="gap-1">
        {getSelectedCategories().length > 0 && data?.content?.filter(category => getSelectedCategories().includes(category.id)).map(category => (
          <CategoryTag key={category.id} category={category} />
        ))}
      </Horizontal>
    </Horizontal>
  );
};

export default FilterCategoryDropdownMenu;