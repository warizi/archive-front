import { Checkbox } from "@/shared/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useCompleteTodoMutate } from "../model/completeTodoApiHooks";
import { toast } from "sonner";
import axios from "axios";

interface TodoCheckboxProps {
  id: number;
  completed: boolean;
  className?: string;
}

function TodoCheckbox({ id, completed, className }: TodoCheckboxProps) {
  const { mutate: completeTodo, isPending} = useCompleteTodoMutate();

  const handleCompleteChange = (checked: CheckedState) => {
    completeTodo({ id, completed: checked == true }, {
      onSuccess: () => {
        if (checked === true) {
          toast.success("할 일을 완료하였습니다.");
        }
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          toast.error(message);
        }
      }
    });
  }

  return (
    <Checkbox
      disabled={isPending}
      checked={completed}
      className={className}
      onCheckedChange={handleCompleteChange}
    />
  );
};

export default TodoCheckbox;