import Vertical from "@/shared/components/ui/Vertical";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BasicSidebar from "./SidebarMenu";
import Horizontal from "@/shared/components/ui/Horizontal";

function MainLayout() {
  return (
    <Vertical className="w-full">
        <Header />
      <Horizontal className="w-full min-h-screen">
      <aside>
        <BasicSidebar />
      </aside>
        <main>
          <Outlet />
        </main>
      </Horizontal>
    </Vertical>
  );
};

export default MainLayout;