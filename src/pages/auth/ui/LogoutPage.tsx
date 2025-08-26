import { useLogoutMutation } from "@/features/user/model/authApiHooks";
import useMeStore from "@/features/user/model/useMeStore";
import { tokenStore } from "@/shared/config/tokenStore";
import { ROUTES_URL } from "@/shared/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const { mutate, isPending } = useLogoutMutation();
  const navigate = useNavigate();
  const { reset } = useMeStore();
  const queryClient = useQueryClient();
  
  queryClient.clear();

  useEffect(() => {
    if (!isPending) {
      mutate(undefined, {
        onSuccess: () => {
          navigate(ROUTES_URL.LOGIN, { replace: true });
          reset();
          tokenStore.clear();
        }
      });
    }
  }, []);

  return (
    <div>
    </div>
  );
};

export default LogoutPage;