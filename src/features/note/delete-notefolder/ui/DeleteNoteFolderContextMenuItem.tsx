import { ContextMenuItem } from "@/shared/components/ui/context-menu";
import { Trash2 } from "lucide-react";

function DeleteNoteFolderContextMenuItem() {
  return (
    <ContextMenuItem variant="destructive" className="group">
      <Trash2
        strokeWidth={1.5}
        className="
          h-4 w-4 transition-colors
          text-zinc-400 dark:text-zinc-500
          group-hover:text-red-600 dark:group-hover:text-red-400
          active:text-red-700 dark:active:text-red-300"
        />
      <span>폴더 삭제</span>
    </ContextMenuItem>
  );
};

export default DeleteNoteFolderContextMenuItem;