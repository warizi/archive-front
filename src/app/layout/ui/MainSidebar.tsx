import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible";
import { Separator } from "@/shared/components/ui/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/shared/components/ui/sidebar";
import { ROUTES_URL } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import { BookCheck, Calendar1, Check, ChevronRight, Home, Plus, Star, Tag, Tags } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebarFooter from "./ProfileSidebarFooter";
import WorkSpaceSidebarHeader from "./WorkSpaceSidebarHeader";
import { useTodoCateGetAllQuery } from "@/features/todo";
import { TodoCateContextMenu, TodoCateSaveDialog } from "@/widgets/todo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";

function MainSidebar() {
  const [ todoCategoryOpen, setTodoCategoryOpen ] = useState(false);
  const { data } = useTodoCateGetAllQuery();
  console.log("todo cate: ", data);
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
                <SidebarMenuButton tooltip={"중요한 할 일"} asChild>
                  <Link to={ROUTES_URL.TODO_IMPORTANT}>
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
                    <SidebarMenuAction className="cursor-pointer">
                      <TodoCateSaveDialog>
                        <Plus />
                      </TodoCateSaveDialog>
                    </SidebarMenuAction>
                  <CollapsibleContent className="CollapsibleContent">
                    <SidebarMenuSub>
                      {data?.map((cate) => (
                        <SidebarMenuSubItem key={cate.id}>
                          <HoverCard openDelay={1400}>
                            <TodoCateContextMenu todoCategory={cate}>
                              <HoverCardTrigger>
                                <SidebarMenuSubButton asChild>
                                    <Link to={"#"}>
                                      <Tag color={"white"} fill={cate.colorHex ? cate.colorHex : "#000000"} strokeWidth={2} className="scale-90"/>
                                      <span className="flex gap-1 items-center w-full">
                                        {cate.title}
                                      </span>
                                    </Link>
                                </SidebarMenuSubButton>
                              </HoverCardTrigger>
                            </TodoCateContextMenu>    
                            {
                              cate.description && (
                                <HoverCardContent>
                                  <p className="text-xs text-muted-foreground">
                                    {cate.description}
                                  </p>
                                </HoverCardContent>
                              )
                            }
                          </HoverCard>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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

export default MainSidebar;