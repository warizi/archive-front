import type { SidebarGroupDataType } from "@/shared/components/ui/AppSidebar";
import Vertical from "@/shared/components/ui/Vertical";
import { NotepadText, Star } from "lucide-react";
import Horizontal from "@/shared/components/ui/Horizontal";
import AppSidebar from "@/shared/components/ui/AppSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const sidebarData: SidebarGroupDataType[] = [
  {
    group: "대시보드",
    items: [
      {
        title: "통계",
        url: "/admin",
        icon: NotepadText
      }
    ]
  },
  {
    group: "회원관리",
    items: [
      {
        title: "회원목록",
        url: "#",
        icon: NotepadText,

      },
      {
        title: "권한관리",
        url: "#",
        icon: Star
      }
    ]
  },
  {
    group: "자원관리",
    items: [
      {
        title: "자원 목록",
        url: "#",
        icon: NotepadText
      },
    ]
  },
  {
    group: "설정",
    items: [
      {
        title: "사이트 설정",
        url: "#",
        icon: NotepadText
      }
    ]
  }
]


function AdminLayout() {
  return (
    <Horizontal className="w-full">
      <aside>
        <AppSidebar data={sidebarData} />
      </aside>
      <Vertical className="w-full h-screen">
        <AdminHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </Vertical>
    </Horizontal>
  );
};

export default AdminLayout;