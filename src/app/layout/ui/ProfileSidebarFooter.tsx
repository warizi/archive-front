import { ProfileCard } from "@/entities/user";
import useMeStore from "@/features/user/model/useMeStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { ROUTES_URL } from "@/shared/constants";
import { Home, LogOut, UserPen, UserStar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function ProfileSidebarFooter() {
  const location = useLocation();
  const { user } = useMeStore();
  const isAdmin = user?.roles.includes("ROLE_ADMIN");
  const isOnAdminRoute = location.pathname.startsWith(ROUTES_URL.ADMIN);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-14">
                <ProfileCard />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-2" side="right">
              <DropdownMenuLabel className="p-0 flex justify-start pl-2">
                <ProfileCard />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserPen />
                <Link to={"#"}>
                  프로필 수정
                </Link>
              </DropdownMenuItem>
              {
                isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to={isOnAdminRoute ? ROUTES_URL.HOME : ROUTES_URL.ADMIN}>
                      {isOnAdminRoute ? <Home /> : <UserStar />}
                      <span>{isOnAdminRoute ? "홈으로 이동" : "관리자 페이지 이동"}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              }
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <Link to={ROUTES_URL.LOGOUT}>
                  로그아웃
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default ProfileSidebarFooter;