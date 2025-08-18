import type { LoginForm } from "@/entities/user";
import { useLoginMutation } from "./authApiHooks"
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "@/shared/constants";
import axios from "axios";
import { toast } from "sonner";

export const useLoginSubmit = () => {
  const { mutate } = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: () => {
        navigate(ROUTES_URL.HOME);
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "로그인에 실패했습니다.";
          toast.error(errorMessage);
        }
      }
    })
  }

  return { onSubmit }
}