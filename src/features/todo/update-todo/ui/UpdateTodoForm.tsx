import { todoSchema, type TodoWithIdPresent } from "@/entities/todo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TodoSubControl from "./TodoSubControl";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Textarea } from "@/shared/components/ui/textarea";
import CategorySelect from "@/features/category/ui/CategorySelect";
import ImportanceSelect from "./ImportanceSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import RepeatControl from "./RepeatControl";
import PeriodControl from "./PeriodControl";
import { UPDATE_TODO_FORM_ID } from "../model/updateTodoFormId";
import { useUpdateTodo } from "../model/todoApiHooks";
import { toast } from "sonner";
import axios from "axios";
import { useDebouncedAutosave } from "../model/UseDebouncedAutoSave";

interface UpdateTodoFormProps {
  defaultValues?: TodoWithIdPresent;
  checkBoxDisabled?: boolean;
}

const TABS = {
  PERIOD: '기간',
  REPEAT: '반복',
}

function UpdateTodoForm({ defaultValues, checkBoxDisabled = false }: UpdateTodoFormProps) {
  const form = useForm<TodoWithIdPresent>({
    resolver: zodResolver(todoSchema.required({ id: true })),
    defaultValues: {
      id: 1, title: "", description: "", completed: false, ...defaultValues,
    },
  });

  
  const { mutate: updateTodoMutate } = useUpdateTodo(defaultValues?.id || 0);
  
  const { handleSubmit, control } = form;


  const onSubmit = (data: TodoWithIdPresent) => {
    updateTodoMutate(data, {
      onSuccess: () => {
        toast.success("할 일이 수정되었습니다.");
      }, 
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          toast.error(message);
        }
      }
    });
  };

  const resetPeriodAndRepeat = () => {
    form.setValue("startDate", undefined);
    form.setValue("endDate", undefined);
    form.setValue("repeat", undefined);
  };

  useDebouncedAutosave({
    form,
    mutate: updateTodoMutate,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" id={UPDATE_TODO_FORM_ID}>
        <div className="flex gap-4 items-center w-full">
          {
            !checkBoxDisabled && (
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(next) => field.onChange(next === true)}
                  />
                )}
              />
            )
          }
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <input {...field} placeholder="할 일 제목을 입력하세요." className="outline-none border-none w-full font-bold" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
          <FormField 
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <CategorySelect
                    selectedCategory={field.value || undefined}
                    onCategoryChange={field.onChange} 
                    className="w-[200px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="importance"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>중요도</FormLabel>
                <FormControl>
                  <ImportanceSelect
                    selectedImportance={field.value}
                    onImportanceChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="subTodo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>세부 할 일</FormLabel>
              <FormControl>
                <TodoSubControl
                  values={field.value || []}
                  onChange={field.onChange}
                  parentId={form.watch("id")}
                  checkBoxDisabled={checkBoxDisabled}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.subTodo?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField 
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="할 일 설명을 입력하세요." className="outline-none border-none w-full resize-none"/>
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Tabs defaultValue={form.watch("repeat") ? TABS.REPEAT : TABS.PERIOD} onValueChange={resetPeriodAndRepeat}>
          <TabsList>
            <TabsTrigger value={TABS.PERIOD}>{TABS.PERIOD}</TabsTrigger>
            <TabsTrigger value={TABS.REPEAT}>{TABS.REPEAT}</TabsTrigger>
          </TabsList>
          <TabsContent value={TABS.PERIOD}>
            <Card>
              <CardHeader>
                <CardTitle>기간 설정</CardTitle>
                <CardDescription>
                  기간이 설정된 할 일은 일정으로 등록됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PeriodControl />
                <FormMessage>
                  {form.formState.errors.startDate?.message}
                  {form.formState.errors.endDate?.message}
                </FormMessage>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value={TABS.REPEAT} >
            <Card>
              <CardHeader>
                <CardTitle>반복 설정</CardTitle>
                <CardDescription>
                  설정되면 반복 할 일 페이지에서 관리하실 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField 
                  control={control}
                  name="repeat"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RepeatControl
                          parentId={form.getValues("id")}
                          repeat={field.value}
                          onRepeatChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage>
                      </FormMessage>
                    </FormItem>
                  )}             
                />
                <span className="text-xs text-rose-400">
                  {form.formState.errors.repeat?.message}
                  {form.formState.errors.repeat?.date?.message}
                  {form.formState.errors.repeat?.dayOfMonth?.message}
                  {form.formState.errors.repeat?.dayOfWeek?.message}
                </span>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default UpdateTodoForm;