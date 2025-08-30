import { workspaceSchema, type Workspace } from "@/entities/workspace";
import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WorkspaceFormCardProps {
  title: string;
  buttonTitle?: string;
  defaultValues?: Workspace;
  onSubmit: (data: Workspace) => void
}

function WorkspaceFormCard({
  title,
  buttonTitle,
  defaultValues,
  onSubmit
}: WorkspaceFormCardProps) {
  const form = useForm<Workspace>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: defaultValues
  })

  const handleOnSubmit = (data: Workspace) => {
    onSubmit(data);
    form.reset();
  }

  useEffect(() => {
    form.reset({
      id: defaultValues?.id ?? undefined,
      title: defaultValues?.title ?? "",
    })
  }, [form, defaultValues])

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <CardHeader>
            <CardTitle>
              {title}
            </CardTitle>
            <CardDescription>
              워크스페이스를 추가/수정 하세요.
            </CardDescription>
            <CardAction>
              <Button type="submit">
                {buttonTitle}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-4 min-w-[350px]">
            <FormField 
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    워크스페이스 이름
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="워크스페이스 이름" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default WorkspaceFormCard;