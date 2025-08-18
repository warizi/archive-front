import { createBrowserRouter } from "react-router-dom";
import { ROLE, ROUTES_URL } from "@/shared/constants";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { MainLayout } from "@/app/layout";
import { HomePage } from "@/pages/home";

export const DefaultRouter = createBrowserRouter([
  {
    path: ROUTES_URL.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  // {
  //   path: ROUTES_URL.LOGIN,
  //   element: <LoginPage />,
  // },
  // {
  //   path: ROUTES_URL.SIGNUP,
  //   element: <SignUpPage />,
  // },
  // {
  //   path: ROUTES_URL.LOGOUT,
  //   element: <LogoutPage />,
  // },
  // {
  //   path: ROUTES_URL.HOME,
  //   element: <ProtectedRoute />, // 인증 필요
  //   children: [
  //     {
  //       element: <MainLayout />, // 동일 레이아웃 사용
  //       children: [
  //         {
  //           element: <RoleRoute requiredRoles={[ROLE.USER]} />,
  //           children: [{ path: ROUTES_URL.HOME, element: <HomePage /> }],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: ROUTES_URL.NOT_FOUND,
    element: <div>페이지를 찾을 수 없습니다.</div>,
  }
]);