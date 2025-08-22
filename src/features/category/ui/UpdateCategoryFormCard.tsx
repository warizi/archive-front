import type { CategoryType } from "@/entities/catogory";
import CategoryFormCard from "./CategoryFormCard";
import { useUpdateCategoryMutation } from "../model/categoryApiHooks";
import { toast } from "sonner";
import axios from "axios";

interface UpdateCategoryFormCardProps {
  defaultValues: CategoryType
}

function UpdateCategoryFormCard({
  defaultValues
}: UpdateCategoryFormCardProps) {
  const { mutate } = useUpdateCategoryMutation();

  const onSubmit = (data: CategoryType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`카테고리가 수정되었습니다.`, {
          description: `${data.name}`
        })
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "카테고리 수정에 실패하였습니다.";
          toast.error(message);
        }
      }
    })
  }
  return (
    <CategoryFormCard
      title="수정하기"
      buttonTitle="수정"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default UpdateCategoryFormCard;