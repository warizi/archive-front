import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginDto, SignupDto } from "./dto";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "@/shared/constants";
import { loginApi, logoutApi, meApi, signupApi } from "../api/authApi";
import useMeStore from "./useMeStore";

export const authKey = {
  me: ["auth", "me"] as const
};

export const useMeQuery = () => useQuery({
  queryKey: authKey.me,
  queryFn: meApi,
  retry: false,
});

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (dto: LoginDto) => loginApi(dto),
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (dto: SignupDto) => signupApi(dto),
  });
};

export const useLogoutMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: authKey.me });
      window.dispatchEvent(new CustomEvent("auth:logout"));
    },
  });
};


export const useCheckUser = () => {
  const { data, isLoading, isError, refetch } = useMeQuery();
  const { setUser } = useMeStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data); // data가 새로 들어올 때만 실행
    }
  }, [data, setUser]); // ✅ 의존성 정확히 지정

  useEffect(() => {
    const logoutHandler = () => {
      queryClient.removeQueries({ queryKey: authKey.me });
      navigate(ROUTES_URL.LOGIN);
    };

    window.addEventListener("auth:logout", logoutHandler);
    return () => window.removeEventListener("auth:logout", logoutHandler);
  }, [navigate]);

  return {
    user: data ?? null,
    isLoading,
    isError,
    isLoggedIn: !!data,
    refetch: refetch, // refetch 함수를 반환하여 필요할 때 사용자 정보를 새로고침할 수 있도록 함
  }
}