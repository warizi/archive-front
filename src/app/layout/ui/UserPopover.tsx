import type { User } from "@/entities/user";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { ROUTES_URL } from "@/shared/constants";
import { Separator } from "@radix-ui/react-select";
import { useNavigate } from "react-router-dom";

interface UserPopoverProps {
  user: User | null;
}

function UserPopover({ user }: UserPopoverProps) {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>{user ? user.username : "Anonymous"}</Button>
      </PopoverTrigger>
      {
        user && (
          <PopoverContent className="w-60 p-2">
            <Separator />
            <div>
              <Button variant={"ghost"} size={"sm"} onClick={() => navigate(ROUTES_URL.LOGOUT)} className="w-full">
                로그아웃
              </Button>
            </div>
          </PopoverContent>
        )
      }
    </Popover>
  );
};

export default UserPopover;