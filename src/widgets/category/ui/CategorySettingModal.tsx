import { type CategoryType } from "@/entities/catogory";
import { CategoryListTable } from "@/features/category";
import CreateCategoryFormCard from "@/features/category/ui/CreateCategoryFormCard";
import UpdateCategoryFormCard from "@/features/category/ui/UpdateCategoryFormCard";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import Horizontal from "@/shared/components/ui/Horizontal";
import Vertical from "@/shared/components/ui/Vertical";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";



function CategorySettingModal({
  open,
  onOpenChange
}: DialogProps) {
  const [ selectedCategory, setSelectedCategory ] = useState<CategoryType | null>(null);
  const [ isNewCategory, setIsNewCategory ] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true} >
      <DialogContent className="min-w-[400px]">
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
          { selectedCategory && (
            <Vertical className="w-full gap-2">
              <UpdateCategoryFormCard 
                defaultValues={selectedCategory}
              />
              <Button
                onClick={() => setSelectedCategory(null)}
              >
                뒤로
              </Button>
            </Vertical>
          )}
          {
            isNewCategory && (
              <Vertical className="w-full gap-2">
                <CreateCategoryFormCard />
                <Button
                  onClick={() => setIsNewCategory(false)}
                >
                  뒤로
                </Button>
              </Vertical>
            )
          }
          {
            !isNewCategory && !selectedCategory && (
              <Vertical className="w-full">
                <CategoryListTable 
                  selectedCategory={selectedCategory}
                  setSelectCategory={setSelectedCategory}
                />
                <Button
                  onClick={() => setIsNewCategory(true)}
                >
                  추가
                </Button>
              </Vertical>
            )
          }
        </Horizontal>
      </DialogContent>
    </Dialog>
  );
};

export default CategorySettingModal;