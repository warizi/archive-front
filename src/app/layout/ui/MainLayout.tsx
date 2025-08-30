import Vertical from "@/shared/components/ui/Vertical";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Horizontal from "@/shared/components/ui/Horizontal";
import MainSidebar from "./MainSidebar";

function MainLayout() {
  return (
    <Horizontal className="w-full">
      <aside className="shrink-0">
        <MainSidebar />
      </aside>
      <Vertical className="flex-1 min-w-0 h-screen">
        <Header />
        <main className="flex-1 min-w-0 px-4 pb-4 h-[calc(100vh-64px)] overflow-scroll">
          <Outlet />
        </main>
      </Vertical>
    </Horizontal>
  );
};

export default MainLayout;