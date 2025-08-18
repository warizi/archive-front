import { signUpFormSchema, USER_ERROR_MESSAGE, type SignUpForm as SingupFormType } from "@/entities/user";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { ROUTES_URL } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupSubmit } from "../model/useSignupSubmit";
import Horizontal from "@/shared/components/ui/Horizontal";
import { CircleQuestionMarkIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";


function SignupForm() {
  const navigate = useNavigate();
  const form = useForm<SingupFormType>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { onSubmit } = useSignupSubmit();

  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle>
              회원가입
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormItem>
              <Horizontal className="gap-1">
                <FormLabel>아이디</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMarkIcon size={14}/>
                  </TooltipTrigger>
                  <TooltipContent className="z-60">
                    <p>{USER_ERROR_MESSAGE.username.min}</p>
                    <p>{USER_ERROR_MESSAGE.username.max}</p>
                  </TooltipContent>
                </Tooltip>
              </Horizontal>
              <FormControl>
                <Input placeholder="아이디를 입력해주세요." autoComplete="username" {...form.register("username")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <Horizontal className="gap-1">
                <FormLabel>비밀번호</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMarkIcon size={14}/>
                  </TooltipTrigger>
                  <TooltipContent className="z-60">
                    <p>{USER_ERROR_MESSAGE.password.min}</p>
                    <p>{USER_ERROR_MESSAGE.password.max}</p>
                  </TooltipContent>
                </Tooltip>
              </Horizontal>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해주세요." autoComplete="new-password" {...form.register("password")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호 확인을 입력해주세요." autoComplete="new-password" {...form.register("passwordConfirm")} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.passwordConfirm?.message}
              </FormMessage>
            </FormItem>
          </CardContent>
          <CardDescription className="flex justify-center">
            <Button 
              variant={"link"} 
              size={"sm"} 
              type="button" 
              className="text-gray-500 hover:text-gray-900 text-xs"
              onClick={() => navigate(ROUTES_URL.LOGIN)}
            >
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