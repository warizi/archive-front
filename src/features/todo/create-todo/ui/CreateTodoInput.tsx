import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { useCreateTodo } from "../model/createTodoHooks";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Button } from "@/shared/components/ui/button";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import { toast } from "sonner";
import axios from "axios";

interface CreateTodoInputProps {
  category?: CategoryWithIdPresent
  className?: string
}

function CreateTodoInput({ category, className }: CreateTodoInputProps) {
  const [ value, setValue ] = useState<string>("");
  const { mutate: createTodo } = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({ title: value, completed: false, category: category }, {
      onSuccess: () => {
        toast.success("할 일이 추가되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "할 일 추가에 실패했습니다.";
          toast.error(message);
        }
      }
    });
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Horizontal className="gap-2 items-center">
        <Input
          type="text"
          placeholder="새로운 할 일을 입력하여 추가하세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" size={"sm"}>
          추가
        </Button>
      </Horizontal>
    </form>
  );
};

export default CreateTodoInput;