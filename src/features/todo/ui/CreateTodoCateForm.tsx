import { todoCategorySchema, type TodoCategory } from "@/entities/todo";
import { Button } from "@/shared/components/ui/button";
import { Form, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTodoCateSaveSubmit } from "../model/useTodoCateSaveSubmit";

interface CreateTodoCateFormProps {
  defaultValues?: TodoCategory;
  callback?: () => void;
}

function CreateTodoCateForm({ defaultValues, callback }: CreateTodoCateFormProps) {
  const form = useForm<TodoCategory>({
    resolver: zodResolver(todoCategorySchema),
    defaultValues
  });
  const { onSubmit } = useTodoCateSaveSubmit();

  const handleSubmit = (data: TodoCategory) => {
    onSubmit(data);
    callback?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="width">제목</Label>
              <Input
                id="width"
                className="col-span-4 h-8"
                {...form.register("title")}
              />
            </div>
            <FormMessage>
              {form.formState.errors.title?.message}
            </FormMessage>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="maxWidth">설명</Label>
              <Input
                id="maxWidth"
                className="col-span-4 h-8"
                {...form.register("description")}
              />
            </div>
            <FormMessage>
              {form.formState.errors.description?.message}
            </FormMessage>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="height">색상</Label>
              <Input
                id="colorHex"
                type="color"
                className="col-span-4 h-8"
                {...form.register("colorHex")}
              />
            </div>
            <FormMessage>
              {form.formState.errors.colorHex?.message}
            </FormMessage>
          </div>
        </div>
        <div className="w-full flex justify-center mt-2">
          <Button size={"sm"} type="submit">
            {defaultValues ? "수정" : "추가"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTodoCateForm;
