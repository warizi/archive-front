import type { SignUpForm } from "@/entities/user";
import { useSignupMutation } from "./authApiHooks";
import { ROLE, ROUTES_URL } from "@/shared/constants";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSignupSubmit = () => {
  const { mutate } = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = (data: SignUpForm) => {
    const signupData = {
      username: data.username,
      password: data.password,
      role: ROLE.USER, // 기본값 설정
    };

    mutate(signupData, {
      onSuccess: () => {
        // 회원가입 성공 시 처리
        navigate(ROUTES_URL.HOME);
      },
      onError: (error) => {
        // 회원가입 실패 시 처리
        if(axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다.";
          toast.error(errorMessage);
        }
      },
    });
  };

  return { onSubmit };
};
