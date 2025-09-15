import { ProfileCard } from "@/entities/user";
import useMeStore from "@/features/user/model/useMeStore";
import { useTheme } from "@/shared/components/model/ThemeProvider";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { ROUTES_URL } from "@/shared/constants";
import { CategorySettingModal } from "@/widgets/category";
import { ChevronsUpDown, Home, LogOut, Moon, Sun, Tags, UserPen, UserStar } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ProfileSidebarFooter() {
  const location = useLocation();
  const { user } = useMeStore();
  const { setTheme, theme } = useTheme();
  const isAdmin = user?.roles.includes("ROLE_ADMIN");
  const isOnAdminRoute = location.pathname.startsWith(ROUTES_URL.ADMIN);

  const [ isOpenCategorySetting, setIsOpenCategorySetting ] = useState<boolean>(false);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-14 flex justify-between w-full items-center cursor-pointer">
                <ProfileCard />
                <ChevronsUpDown />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-2" side="top" sideOffset={8} align="end" alignOffset={0}>
              <DropdownMenuLabel className="p-0 flex justify-start pl-2">
                <ProfileCard />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <UserPen />
                <Link to={"#"}>
                  프로필 수정
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsOpenCategorySetting(true)}>
                <Tags />
                카테고리 설정
              </DropdownMenuItem>
              {
                isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={isOnAdminRoute ? ROUTES_URL.HOME : ROUTES_URL.ADMIN}>
                      {isOnAdminRoute ? <Home /> : <UserStar />}
                      <span>{isOnAdminRoute ? "홈으로 이동" : "관리자 페이지 이동"}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              }
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                  <span className="ml-4">테마 설정</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent alignOffset={-29} sideOffset={15}>
                    <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
                
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut />
                <Link to={ROUTES_URL.LOGOUT} className="w-full">
                  로그아웃
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      {/* category setting modal */}
      <CategorySettingModal open={isOpenCategorySetting} onOpenChange={setIsOpenCategorySetting} />
    </SidebarFooter>
  );
};

export default ProfileSidebarFooter;