import { Checkbox } from "@/shared/components/ui/checkbox";
import { useCompleteTodoSub } from "../model/completeTodoSubApiHooks";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "@/entities/todo";

interface TodoSubCheckboxProps {
  id: number;
  completed: boolean;
  parentId?: number;
  className?: string;
}


function TodoSubCheckbox({ id, completed, className, parentId }: TodoSubCheckboxProps) {
  const { mutate: completeTodoSub, isPending} = useCompleteTodoSub();
  const queryClient = useQueryClient();

  const handleCompleteChange = (checked: boolean) => {

    completeTodoSub({ id, completed: checked }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.detail(parentId) });
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          toast.error(message);
        }
          
      }
    });
  };

  return (
    <Checkbox
      disabled={isPending}
      checked={completed}
      className={className}
      onCheckedChange={handleCompleteChange}
      aria-label={`하위 할 일 ${completed ? "완료" : "미완료"}: ${id}`}
    />
  );
};

export default TodoSubCheckbox;
