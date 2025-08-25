import { CreateTodoInput } from "@/features/todo/create-todo";
import { useGetTodo } from "@/features/todo/list-todo/model/todoApiHooks";
import { Button } from "@/shared/components/ui/button";
import DatePicker from "@/shared/components/ui/DatePicker";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { TodoFormSheetContent } from "@/widgets/todo";
import { useState } from "react";

function TodoPage() {
  const [date, setDate] = useState<string | undefined>(undefined);
  const { data } = useGetTodo(5);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            Create Todo
          </Button>
        </SheetTrigger>
        <TodoFormSheetContent todo={data?.data} />
        <DatePicker date={date} onDateChange={setDate}/>
      </Sheet>
      <CreateTodoInput />
    </div>
  );
};

export default TodoPage;