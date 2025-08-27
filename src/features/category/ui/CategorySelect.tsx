import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useGetCategoryListQuery } from "../model/categoryApiHooks";
import { CategoryTag } from "@/entities/catogory";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import { cn } from "@/shared/lib/utils";

interface CategorySelectProps {
  selectedCategory: CategoryWithIdPresent | undefined;
  onCategoryChange: (category?: CategoryWithIdPresent | null) => void;
  className?: string;
}

function CategorySelect({ selectedCategory, onCategoryChange, className }: CategorySelectProps) {
  const { data: categories, isLoading } = useGetCategoryListQuery({
    page: 0,
    size: 30,
    sort: `sortOrder,desc`
  });

  if (isLoading) return null;
  
  return (
    <Select 
      onValueChange={(id?: string) => {
        onCategoryChange(categories?.content.find(category => category.id === Number(id)) || null)
      }} 
      value={selectedCategory ? String(selectedCategory?.id) : ""}
    >
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder="카테고리를 선택하세요." defaultChecked className=""/>
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