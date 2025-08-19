import { createBrowserRouter } from "react-router-dom";
import { ROLE, ROUTES_URL } from "@/shared/constants";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { MainLayout } from "@/app/layout";
import { HomePage } from "@/pages/home";
import { LoginPage, LogoutPage, SignupPage } from "@/pages/auth";
import AdminLayout from "@/app/layout/ui/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin";

export const DefaultRouter = createBrowserRouter([

  {
    path: ROUTES_URL.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES_URL.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES_URL.LOGOUT,
    element: <LogoutPage />,
  },
  {
    path: ROUTES_URL.HOME,
    element: <ProtectedRoute />, // 인증 필요
    children: [
      { // user page
        element: <RoleRoute requiredRoles={[ROLE.USER]} />,
        children: [
          {
            element: <MainLayout />, // 동일 레이아웃 사용
            children: [{ path: ROUTES_URL.HOME, element: <HomePage /> }],
          },
        ],
      },
      { // admin page
        element: <RoleRoute requiredRoles={[ROLE.ADMIN]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [{ path: ROUTES_URL.ADMIN, element: <AdminDashboardPage /> }],
          }
        ]
      }
    ],
  },
  {
    path: ROUTES_URL.NOT_FOUND,
    element: <div>페이지를 찾을 수 없습니다.</div>,
  }
]);