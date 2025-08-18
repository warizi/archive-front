import { useCheckUser } from "@/features/user/model/authApiHooks";
import { ROUTES_URL } from "@/shared/constants";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { 
    isLoggedIn, 
    isLoading 
  } = useCheckUser();

  if (isLoading) {
    return <div></div>; // You can replace this with a loading spinner or skeleton
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES_URL.LOGIN} replace />;
};

export default ProtectedRoute;
