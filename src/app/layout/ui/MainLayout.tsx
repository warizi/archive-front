import Vertical from "@/shared/components/ui/Vertical";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppSidebar, { type SidebarGroupDataType } from "@/shared/components/ui/AppSidebar";
import Horizontal from "@/shared/components/ui/Horizontal";
import { NotepadText, Star } from "lucide-react";

const sidebarData: SidebarGroupDataType[] = [
  {
    group: "Todo",
    items: [
      {
        title: "할 일 목록",
        url: "#",
        icon: NotepadText,
      },
      {
        title: "중요한 할 일",
        url: "#",
        icon: Star
      }
    ]
  }
]

function MainLayout() {
  return (
    <Horizontal className="w-full">
      <aside>
        <AppSidebar data={sidebarData}/>
      </aside>
      <Vertical className="w-full h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </Vertical>
    </Horizontal>
  );
};

export default MainLayout;