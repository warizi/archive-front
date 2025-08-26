import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useGetCategoryListQuery } from "../model/categoryApiHooks";
import { CategoryTag } from "@/entities/catogory";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";

interface CategorySelectProps {
  selectedCategory: CategoryWithIdPresent | undefined;
  onCategoryChange: (category?: CategoryWithIdPresent) => void;
  className?: string;
}
function CategorySelect({ selectedCategory, onCategoryChange, className }: CategorySelectProps) {
  const { data: categories } = useGetCategoryListQuery({
    page: 0,
    size: 30,
    sort: `sortOrder,desc`
  });
  
  return (
    <Select 
      onValueChange={(id: string) => onCategoryChange(categories?.content.find(category => category.id === Number(id)))} 
      value={selectedCategory ? String(selectedCategory?.id) : ""}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="카테고리를 선택하세요." defaultChecked/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리</SelectLabel>
          {
            selectedCategory && (
              <SelectItem value={undefined}>
                선택 안함
              </SelectItem>
            )
          }
          {categories?.content?.map((category) => (
            <SelectItem key={category.id} value={String(category.id)} className="flex gap-2">
              <CategoryTag category={category} />
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;