import useMeStore from "@/features/user/model/meStore";
import Horizontal from "@/shared/components/ui/Horizontal";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import UserPopover from "./UserPopover";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES_URL } from "@/shared/constants";

function AdminHeader() {
  const { user } = useMeStore();

  return (
    <Horizontal justify="between" align="center" className="h-[40px] px-2 z-50">
      <Horizontal className="h-5 items-center space-x-1">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="ml-2">Logo</h1>
      </Horizontal>
      <Horizontal className="h-5 items-center space-x-1">
        <Button size={"xs"} >
          <Link to={ROUTES_URL.HOME}>
            홈으로
          </Link>
        </Button>
        <UserPopover user={user} />
      </Horizontal>
    </Horizontal>
  );
};

export default AdminHeader;