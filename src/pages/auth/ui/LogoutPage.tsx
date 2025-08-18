import { useLogoutMutation } from "@/features/user/model/authApiHooks";
import useMeStore from "@/features/user/model/meStore";
import { tokenStore } from "@/shared/config/tokenStore";
import { ROUTES_URL } from "@/shared/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const { mutate, isPending } = useLogoutMutation();
  const navigate = useNavigate();
  const { reset } = useMeStore();

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