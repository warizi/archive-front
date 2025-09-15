import useMeStore from "@/features/user/model/useMeStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import Horizontal from "@/shared/components/ui/Horizontal";
import Vertical from "@/shared/components/ui/Vertical";

function ProfileCard() {
  const { user } = useMeStore();
  return (
    <Horizontal justify="center" align="center" className="h-12 gap-2">
      <Avatar className="group-data-[collapsible=icon]:size-4 transition-all duration-300 ease-in-out">
        <AvatarImage src="https://github.com/shadcn.png" alt="프로필 이미지" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Vertical className="text-sm">
        <span>{user?.username}</span>
        <span className="text-xs">_@archive.com</span>
      </Vertical>
    </Horizontal>
  );
};

export default ProfileCard;