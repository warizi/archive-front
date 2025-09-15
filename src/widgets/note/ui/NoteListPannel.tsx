import type { NoteFolderWithIdPresent, NoteWithIdPresent } from "@/entities/note";
import { CreateNoteInFolderButton } from "@/features/note/create-note";
import { NoteListSortableTable, useGetNoteListInFolder } from "@/features/note/list-note";
import { useMoveNoteInFolder } from "@/features/note/update-note";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Separator } from "@/shared/components/ui/separator";
import Vertical from "@/shared/components/ui/Vertical";
import axios from "axios";
import { toast } from "sonner";
import NoteFolderBreadcrumb from "./NoteFolderBreadcrumb";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface NoteListInFolderPannelProps {
  folder: NoteFolderWithIdPresent
  setFolder: (folder: NoteFolderWithIdPresent | null) => void;
  folderList: NoteFolderWithIdPresent[];
}

function NoteListInFolderPannel({ 
  folder,
  setFolder,
  folderList
}: NoteListInFolderPannelProps) {
  const { data } = useGetNoteListInFolder(folder.id);

  const { mutate } = useMoveNoteInFolder(folder.id);

  const handleDragEnd = (data: NoteWithIdPresent[]) => {
    const sortedData = data.map((note, index) => ({
      ...note,
      sortOrder: index + 1
    }));
    mutate(sortedData, {
      onSuccess: () => {
        toast.success("노트 순서가 변경되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          toast.error(message || "노트 순서 변경에 실패했습니다.");
        }
      }
    });
  };
  return (
    <Vertical className="h-full w-full">
      <Horizontal justify="between" align="center" className="pl-4 w-full">
        <div className="flex-1 overflow-hidden">
          <NoteFolderBreadcrumb
            currentFolder={folder}
            folderList={folderList}
            setCurrentFolder={setFolder}
          />
        </div>
        <Horizontal className="shrink-0">
          <CreateNoteInFolderButton folderId={folder.id} />
        </Horizontal>
      </Horizontal>
      <Separator orientation="horizontal" />
      <Vertical className="h-full">
        <ScrollArea className="h-full w-full overflow-auto">
          <NoteListSortableTable 
            data={data?.data || []}
            handleDragEnd={handleDragEnd}
          />
        </ScrollArea>
      </Vertical>
    </Vertical>
  );
};

export default NoteListInFolderPannel;