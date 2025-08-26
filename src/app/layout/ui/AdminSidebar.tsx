import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Separator } from "@/shared/components/ui/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/shared/components/ui/sidebar";
import { ROUTES_URL } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import { BookCheck, Calendar1, ChevronRight, Plus, Star, Tags } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebarFooter from "./ProfileSidebarFooter";

function AdminSidebar() {
  const [ todoCategoryOpen, setTodoCategoryOpen ] = useState(false);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent>
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
                <SidebarMenuButton tooltip={"중요한 할 일"} asChild>
                  <Link to={ROUTES_URL.TODO_REPEAT}>
                    <Star />
                    <span>
                      중요한 할 일
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible 
                className="group/collapsible"
                open={todoCategoryOpen}
                onOpenChange={setTodoCategoryOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={"할 일 카테고리"}>
                      <Tags size={16}/>
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate group-data-[collapsible=icon]/sidebar:hidden">
                          할 일 카테고리
                        </span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            todoCategoryOpen ? "rotate-90" : "rotate-0"
                          )}
                        />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="CollapsibleContent">
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to={"#"}>
                            <span className="flex gap-1 items-center">
                              <Plus size={14} />
                              추가
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        {/* NOTE */}
        <SidebarGroup>
          <SidebarGroupLabel>Note</SidebarGroupLabel>
          <SidebarGroupContent>
                      
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        {/* CALENDAR */}
        <SidebarGroup>
          <SidebarGroupLabel>Calendar</SidebarGroupLabel>
          <SidebarGroupContent>
                      
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <ProfileSidebarFooter />
    </Sidebar>
  );
};

export default AdminSidebar;