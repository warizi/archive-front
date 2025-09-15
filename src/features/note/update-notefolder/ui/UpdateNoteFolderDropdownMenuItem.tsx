import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Edit } from "lucide-react";

function UpdateNoteFolderDropdownMenuItem() {
  return (
    <DropdownMenuItem>
      <Edit />
      <span>폴더 이름 변경</span>
    </DropdownMenuItem>
  );
};

export default UpdateNoteFolderDropdownMenuItem;