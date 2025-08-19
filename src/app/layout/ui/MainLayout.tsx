import Vertical from "@/shared/components/ui/Vertical";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Horizontal from "@/shared/components/ui/Horizontal";
import MainSidebar from "./MainSidebar";

function MainLayout() {
  return (
    <Horizontal className="w-full">
      <aside>
        <MainSidebar />
      </aside>
      <Vertical className="w-full h-screen">
        <Header />
        <main className="flex-1 p-2">
          <Outlet />
        </main>
      </Vertical>
    </Horizontal>
  );
};

export default MainLayout;