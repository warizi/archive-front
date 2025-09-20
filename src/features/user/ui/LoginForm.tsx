import { loginFormSchema, type LoginForm as LoginFormType } from "@/entities/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "@/shared/constants";
import { useLoginSubmit } from "../model/useLoginSubmit";

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { onSubmit } = useLoginSubmit();

  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle>
              계정 로그인
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="아이디를 입력해주세요." autoComplete="username" {...form.register("username")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해주세요." autoComplete="current-password" {...form.register("password")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          </CardContent>
          <CardDescription className="flex justify-center">
            <Button 
              variant={"link"} 
              size={"sm"} 
              type="button" 
              className="text-gray-500 hover:text-gray-900 hover:dark:text-gray-200 text-xs"
              onClick={() => navigate(ROUTES_URL.SIGNUP)}
            >
              회원가입이 필요하신가요? 회원가입
            </Button>
          </CardDescription>
          <CardFooter className="flex justify-center gap-4">
            <Button type="submit">
              로그인
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;