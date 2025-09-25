import Vertical from "@/shared/components/ui/Vertical";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Horizontal from "@/shared/components/ui/Horizontal";
import MainSidebar from "./MainSidebar";

function MainLayout() {
  return (
    <Horizontal className="w-full overflow-x-hidden">
      <aside className="shrink-0">
        <MainSidebar />
      </aside>
      <Vertical className="flex-1 min-w-0 w-full h-screen overflow-hidden">
        <Header />
        <main className="flex-1 min-w-0 h-screen-no-header overflow-hidden">
          <Outlet />
        </main>
      </Vertical>
    </Horizontal>
  );
};

export default MainLayout;