import type { TodoCategory } from "@/entities/todo";
import { toast } from "sonner";
import { useTodoCateSaveMutation } from "./todoCateApiHooks";
import axios from "axios";

export const useTodoCateSaveSubmit = () => {
  const { mutate } = useTodoCateSaveMutation();

  const onSubmit = (data: TodoCategory) => {
    const isCreate = !data.id;

    mutate(data, {
      onSuccess: () => {
        toast.success(
          isCreate ? "할 일 카테고리가 추가되었습니다." : "할 일 카테고리가 수정되었습니다."
        );
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "할 일 카테고리 추가에 실패했습니다.";
          toast.error(errorMessage);
        }
      }
    });
  }

  return { onSubmit };
}