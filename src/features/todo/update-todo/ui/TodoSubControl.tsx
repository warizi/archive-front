import type { TodoSubType } from "@/entities/todo";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface TodoSubControlProps {
  values: TodoSubType[];
  onChange: (values: TodoSubType[]) => void;
  parentId: number;
  checkBoxDisabled?: boolean;
}
function TodoSubControl({
  values,
  onChange,
  parentId,
  checkBoxDisabled = false
}: TodoSubControlProps) {
  const [ newSubTodo, setNewSubTodo ] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubTodo(event.target.value);
  };

  const add = useCallback(
    () => {
      if (!newSubTodo.trim()) return;
      if (values.filter((it) => it.title === newSubTodo.trim()).length > 0) {
        toast.error("이미 존재하는 세부 할 일입니다.");
        return;
      }
      setNewSubTodo("");
      onChange([...values, { title: newSubTodo.trim(), completed: false, order: values.length, parentId: parentId }])
    },
    [values, onChange, newSubTodo, parentId]
  );

  const updateAt = useCallback(
    (i: number, patch: Partial<TodoSubType>) =>
      onChange(values.map((it, idx) => (idx === i ? { ...it, ...patch } : it))),
    [values, onChange]
  );

  const removeAt = useCallback(
    (i: number) => onChange(values.filter((_, idx) => idx !== i)),
    [values, onChange]
  );

  return (
    <div className="border rounded-md">
      <Table>
        <TableBody>
          <TableRow className="dark:bg-input/30">
            <TableCell colSpan={2}>
              <input 
                type="text" 
                className="outline-none w-full" 
                placeholder="세부 할 일을 입력하여 추가하세요. (Enter)"
                value={newSubTodo}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    add();
                  }
                }}
              />
            </TableCell>
            <TableCell width={12} className="p-0">
              <Button variant={"ghost"} size={"icon"} type="button" onClick={add}>
                <Plus />
              </Button>
            </TableCell>
          </TableRow>
          {values.map((subTodo, index) => (
            <TableRow key={`${index}-${subTodo.id}`} className="group hover:bg-inherit">
              <TableCell width={40}>
                {!checkBoxDisabled && (
                  <Checkbox 
                    checked={subTodo.completed}
                    className="cursor-pointer"
                    onCheckedChange={(checked) => updateAt(index, { completed: checked === true })}
                  /> 
                )}
              </TableCell>
              <TableCell>
                <input 
                  type="text" 
                  value={subTodo.title}  
                  className="outline-none w-full"
                  onChange={(e) => updateAt(index, { title: e.target.value })}
                />
              </TableCell>
              <TableCell width={12} className="p-0">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  className="group-hover:opacity-100 opacity-0"
                  onClick={() => removeAt(index)}
                >
                  <Trash2 
                    className="
                    group-hover:text-red-600 dark:group-hover:text-red-400
                    active:text-red-700 dark:active:text-red-300"
                    strokeWidth={1.3}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoSubControl;