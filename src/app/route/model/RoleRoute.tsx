
import { useCheckUser } from "@/features/user/model/authHooks";
import { ROUTES_URL } from "@/shared/constants";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RoleRouteProps {
  requiredRoles: string[];
}

function RoleRoute({ requiredRoles }: RoleRouteProps) {
  const { user } = useCheckUser();

  const hasAccess = user?.roles.some(role => requiredRoles.includes(role));

  useEffect(() => {
    if (user && !hasAccess) {
      alert("권한이 없습니다.");
    }
  }, [user, hasAccess]);

  return hasAccess ? <Outlet /> : <Navigate to={ROUTES_URL.HOME} replace />;
};

export default RoleRoute;