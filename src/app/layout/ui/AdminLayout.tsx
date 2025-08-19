import Vertical from "@/shared/components/ui/Vertical";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import MainSidebar from "./MainSidebar";

function AdminLayout() {
  return (
    <Horizontal className="w-full">
      <aside>
        <MainSidebar />
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