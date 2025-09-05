import { ContextMenuItem } from "@/shared/components/ui/context-menu";
import { Edit } from "lucide-react";

function UpdateNoteFolderContextMenuItem() {
  return (
    <ContextMenuItem>
      <Edit />
      <span>폴더 이름 변경</span>
    </ContextMenuItem>
  );
};

export default UpdateNoteFolderContextMenuItem;