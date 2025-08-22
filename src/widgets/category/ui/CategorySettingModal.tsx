import { type CategoryType } from "@/entities/catogory";
import { CategoryListTable } from "@/features/category";
import CreateCategoryFormCard from "@/features/category/ui/CreateCategoryFormCard";
import UpdateCategoryFormCard from "@/features/category/ui/UpdateCategoryFormCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Separator } from "@/shared/components/ui/separator";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";



function CategorySettingModal({
  open,
  onOpenChange
}: DialogProps) {
  const [ selectedCategory, setSelectedCategory ] = useState<CategoryType | null>(null);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true} >
      <DialogContent className="min-w-[800px]">
        <DialogHeader className="h-fit">
          <DialogTitle>
            카테고리 설정
          </DialogTitle>
          <DialogDescription>
            <span>
              카테고리는 할 일, 노트, 일정에 모두 공유됩니다.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Horizontal className="gap-2">
          { !selectedCategory ? (
            <CreateCategoryFormCard />
          ) : (
            <UpdateCategoryFormCard 
              defaultValues={selectedCategory}
            />
          )}
          <Separator orientation="vertical" />
          <CategoryListTable 
            selectedCategory={selectedCategory}
            setSelectCategory={setSelectedCategory}
          />
        </Horizontal>
      </DialogContent>
    </Dialog>
  );
};

export default CategorySettingModal;