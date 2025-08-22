import type { CategoryType } from "@/entities/catogory";
import { useCreateCategoryMutation } from "../model/categoryApiHooks";
import CategoryFormCard from "./CategoryFormCard";
import { toast } from "sonner";
import axios from "axios";

function CreateCategoryFormCard() {
  const { mutate } = useCreateCategoryMutation();

  const onSubmit = (data: CategoryType) => {
    console.log(data)
    mutate(data, {
      onSuccess: () => {
        toast.success(`카테고리가 추가되었습니다.`, {
          description: `${data.name}`
        })
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