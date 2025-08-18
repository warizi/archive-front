import { signUpFormSchema, type SignUpForm as SingupFormType } from "@/entities/user";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


function SignupForm() {
  const form = useForm<SingupFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SingupFormType) => {
    console.log(data);
  }

  return (
    <Card className="max-w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle>
              회원가입
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input {...form.register("username")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" {...form.register("password")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" {...form.register("passwordConfirm")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.passwordConfirm?.message}
              </FormMessage>
            </FormItem>
          </CardContent>
          <CardDescription className="flex justify-center">
            <Button variant={"link"} size={"sm"} type="button" className="text-gray-500 hover:text-gray-900">
              이미 계정이 있으신가요? 로그인
            </Button>
          </CardDescription>
          <CardFooter className="flex justify-center gap-4">
            <Button type="submit">
              회원가입
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;