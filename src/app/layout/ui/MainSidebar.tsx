import { Separator } from "@/shared/components/ui/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { ROUTES_URL } from "@/shared/constants";
import { BookCheck, Calendar, Calendar1, CalendarCheck, Check, Folder, Home, NotepadText, Repeat2 } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileSidebarFooter from "./ProfileSidebarFooter";
import WorkSpaceSidebarHeader from "./WorkSpaceSidebarHeader";

function MainSidebar() {
  return (
    <Sidebar collapsible="icon">
      <WorkSpaceSidebarHeader />
      <SidebarContent>
        {/* HOME */}
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"홈"} asChild>
                  <Link to={ROUTES_URL.HOME}>
                    <Home />
                    <span>
                      대시보드
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        {/* TODO */}
        <SidebarGroup>
          <SidebarGroupLabel>Todo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"오늘 할 일"} asChild>
                  <Link to={ROUTES_URL.TODO_TODAY}>
                    <Calendar1 />
                    <span>
                      오늘 할 일
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"할 일 목록"} asChild>
                  <Link to={ROUTES_URL.TODO}>
                    <BookCheck />
                    <span>
                      할 일 목록
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"반복 할 일"} asChild>
                  <Link to={ROUTES_URL.TODO_REPEAT}>
                    <Repeat2 />
                    <span>
                      반복 할 일
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"완료한 일"} asChild>
                  <Link to={ROUTES_URL.TODO_COMPLETE}>
                    <Check />
                    <span>
                      완료한 일
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        {/* NOTE */}
        <SidebarGroup>
          <SidebarGroupLabel>Note</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"전체 노트"} asChild>
                  <Link to={"#"}>
                    <NotepadText />
                    <span>
                      전체 노트
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"폴더"} asChild>
                  <Link to={"#"}>
                    <Folder />
                    <span>
                      폴더
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        {/* CALENDAR */}
        <SidebarGroup>
          <SidebarGroupLabel>Calendar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"달력 일정"} asChild>
                  <Link to={"#"}>
                    <Calendar />
                    <span>
                      달력 일정
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"달력 기록"} asChild>
                  <Link to={"#"}>
                    <CalendarCheck />
                    <span>
                      달력 기록
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <ProfileSidebarFooter />
    </Sidebar>
  );
};

export default MainSidebar;