import Horizontal from "@/shared/components/ui/Horizontal";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";

function Header() {

  return (
    <Horizontal justify="between" align="center" className="h-[40px] px-2 z-50">
      <Horizontal className="h-5 items-center space-x-1">
        <SidebarTrigger />
        <Separator orientation="vertical" />
      </Horizontal>
    </Horizontal>
  );
};

export default Header;