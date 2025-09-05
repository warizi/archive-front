import { CreateFolderButton } from "@/features/note/create-notefolder";
import { NoteFolderList } from "@/features/note/list-notefolder";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Separator } from "@/shared/components/ui/separator";
import Vertical from "@/shared/components/ui/Vertical";

function NoteFolderSidebar() {
  return (
    <Vertical className="w-full">
      <Horizontal justify="end" align="center">
        <CreateFolderButton />
      </Horizontal>
      <Separator orientation="horizontal" className="mb-4" />
      <NoteFolderList />
    </Vertical>
  );
};

export default NoteFolderSidebar;