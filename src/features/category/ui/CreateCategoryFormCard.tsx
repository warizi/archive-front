import type { CategoryType } from "@/entities/catogory";
import { useCreateCategoryMutation } from "../model/categoryApiHooks";
import CategoryFormCard from "./CategoryFormCard";
import { toast } from "sonner";
import axios from "axios";
import { useCategoryFilter } from "../model/useCategoryFilter";

function CreateCategoryFormCard() {
  const { mutate } = useCreateCategoryMutation();
  const { addSelectedCategory } = useCategoryFilter();

  const onSubmit = (data: CategoryType) => {
    mutate(data, {
      onSuccess: (res) => {
        const { id } = res;
        toast.success(`카테고리가 추가되었습니다.`, {
          description: `${data.name}`
        })
        addSelectedCategory(id);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "카테고리 생성에 실패하였습니다.";
          toast.error(message);
        }
      }
    })
  }
  return (
    <CategoryFormCard 
      title="추가하기"
      buttonTitle="추가"
      onSubmit={onSubmit}
    />
  );
};

export default CreateCategoryFormCard;