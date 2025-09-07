import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import Vertical from "@/shared/components/ui/Vertical";
import { NoteListInFolderPannel, ResizableBoxWithNoteFolderSidebar } from "@/widgets/note";

function NotePage() {
  return (
    <ResizableBoxWithNoteFolderSidebar>
      {(selectedFolder, setSelectedFolder, folderList) => (
        <>
        {
          selectedFolder ? (
            <NoteListInFolderPannel folder={selectedFolder} setFolder={setSelectedFolder} folderList={folderList} />
          ) : (
            <Vertical className="p-4 h-full " justify="center" align="center">
              <EmptyMessageCard message="폴더를 선택하여 노트를 작성하세요." />
            </Vertical>
          )
        }
        </>
      )}
    </ResizableBoxWithNoteFolderSidebar>
  );
};

export default NotePage;