import type { NoteFolderWithIdPresent } from "@/entities/note";
import { ContextMenu, ContextMenuContent, ContextMenuSeparator, ContextMenuTrigger } from "@/shared/components/ui/context-menu";
import { CreateFolderContextItem } from "../../create-notefolder";
import { AlertDialog, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { DeleteNoteFolderAlertDialogContent, DeleteNoteFolderContextMenuItem } from "../../delete-notefolder";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { UpdateNoteFolderContextMenuItem, UpdateNoteFolderDialogContent } from "../../update-notefolder";

interface NoteFolderContextMenuProps {
  noteFolder: NoteFolderWithIdPresent;
  asChild?: boolean;
  children: React.ReactNode;
}

function NoteFolderContextMenu({
  noteFolder,
  asChild = false,
  children
}: NoteFolderContextMenuProps) {
  const { id } = noteFolder;
  return (
    <AlertDialog>
      <Dialog>
        <ContextMenu>
          <ContextMenuTrigger asChild={asChild}>
            {children}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <CreateFolderContextItem parentId={id} />
            <DialogTrigger asChild>
              <button onClick={(e) => e.stopPropagation()} className="w-full text-left">
                <UpdateNoteFolderContextMenuItem />
              </button>
            </DialogTrigger>
            <ContextMenuSeparator />
            <AlertDialogTrigger asChild>
              <button onClick={(e) => e.stopPropagation()} className="w-full text-left">
                <DeleteNoteFolderContextMenuItem />
              </button>
            </AlertDialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <UpdateNoteFolderDialogContent noteFolder={noteFolder} />
      </Dialog>
      <DeleteNoteFolderAlertDialogContent noteFolder={noteFolder} />
    </AlertDialog>
  );
};

export default NoteFolderContextMenu;