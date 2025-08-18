import Horizontal from "@/shared/components/ui/Horizontal";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";

function Header() {
  return (
    <Horizontal justify="between" align="center" className="h-[60px] bg-white px-2 z-50">
      <Horizontal className="gap-2">
        <SidebarTrigger />
        <h1>Logo</h1>
      </Horizontal>
    </Horizontal>
  );
};

export default Header;