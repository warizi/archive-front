import type { NoteFolderWithIdPresent } from "@/entities/note";
import { CreateFolderDropdownItem } from "../../create-notefolder";
import { AlertDialog, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { DeleteNoteFolderAlertDialogContent, DeleteNoteFolderDropdownMenuItem } from "../../delete-notefolder";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { UpdateNoteFolderDropdownMenuItem, UpdateNoteFolderDialogContent } from "../../update-notefolder";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";

interface NoteFolderDropdownMenuProps {
  noteFolder: NoteFolderWithIdPresent;
  asChild?: boolean;
  children: React.ReactNode;
}

function NoteFolderDropdownMenu({
  noteFolder,
  asChild = false,
  children
}: NoteFolderDropdownMenuProps) {
  const { id } = noteFolder;
  return (
    <AlertDialog>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild={asChild}>
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <CreateFolderDropdownItem parentId={id} />
            <DialogTrigger asChild>
              <button onClick={(e) => e.stopPropagation()} className="w-full text-left">
                <UpdateNoteFolderDropdownMenuItem />
              </button>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <button onClick={(e) => e.stopPropagation()} className="w-full text-left">
                <DeleteNoteFolderDropdownMenuItem />
              </button>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpdateNoteFolderDialogContent noteFolder={noteFolder} />
      </Dialog>
      <DeleteNoteFolderAlertDialogContent noteFolder={noteFolder} />
    </AlertDialog>
  );
};

export default NoteFolderDropdownMenu;