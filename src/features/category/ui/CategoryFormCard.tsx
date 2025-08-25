import { CategoryTag, type CategoryType } from "@/entities/catogory";
import { categorySchema } from "@/entities/catogory/model/Category";
import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormCardProps {
  title: string;
  buttonTitle?: string;
  defaultValues?: CategoryType
  onSubmit: (data: CategoryType) => void
}

function CategoryFormCard({
  title,
  buttonTitle = "추가",
  onSubmit,
  defaultValues
}: CategoryFormCardProps) {
  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues 
  });

  const handleOnSubmit = (data: CategoryType) => {
    onSubmit(data);
    form.reset();
  }

  useEffect(() => {
    form.reset({
      id: defaultValues?.id ?? undefined,
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      colorHex: defaultValues?.colorHex ?? "#000000",
    });
  }, [defaultValues, form]);
  
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <CardHeader>
            <CardTitle>
              {title}
            </CardTitle>
            <CardDescription>
              카테고리를 추가/수정 하세요.
            </CardDescription>
            <CardAction>
              <Button type="submit">
                {buttonTitle}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-4 min-w-[350px]">
            <FormItem>
              <FormLabel>
                카테고리 이름
              </FormLabel>
              <FormControl>
                <Input placeholder="카테고리 이름을 입력해주세요." {...form.register("name")}/>
              </FormControl>
              <FormMessage>
                {form.formState.errors.name?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>
                카테고리 설명
              </FormLabel>
              <FormControl>
                <Input placeholder="카테고리 설명을 입력해주세요." {...form.register("description")} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>
                카테고리 색상
              </FormLabel>
              <div className="flex gap-4">
                <FormControl>
                  <Input type="color" {...form.register("colorHex")} className="w-42"/>
                </FormControl>
                <div className="flex-1 flex justify-center">
                  <CategoryTag 
                    size={26}
                    category={{
                      name: form.watch("name"),
                      description: form.watch("description"),
                      colorHex: form.watch("colorHex")
                    }}
                  />
                </div>
              </div>
              <FormMessage>
                {form.formState.errors.colorHex?.message}
              </FormMessage>
            </FormItem>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default CategoryFormCard;