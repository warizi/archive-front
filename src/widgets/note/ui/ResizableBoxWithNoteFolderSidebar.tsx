import type { NoteFolderWithIdPresent } from "@/entities/note";
import { CreateFolderButton } from "@/features/note/create-notefolder";
import { NoteFolderList } from "@/features/note/list-notefolder";
import { useGetAllNoteFolder } from "@/features/note/list-notefolder/model/listNoteFolderApiHooks";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/resizable";
import Horizontal from "@/shared/components/ui/Horizontal";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import Vertical from "@/shared/components/ui/Vertical";
import { useState } from "react";

interface ResizableBoxWithNoteFolderSidebarProps {
  // Define any props you need here
  children?: (selectedFolder: NoteFolderWithIdPresent | null, setSelectedFolder: (folder: NoteFolderWithIdPresent | null) => void, folderList: NoteFolderWithIdPresent[]) => React.ReactNode;
}

function ResizableBoxWithNoteFolderSidebar({
  children
}: ResizableBoxWithNoteFolderSidebarProps) {
  const { data } = useGetAllNoteFolder();
  const [ selectedFolder, setSelectedFolder ] = useState<NoteFolderWithIdPresent | null>(null);

  return (
    <ResizablePanelGroup 
      className="min-h-screen-no-header"
      direction="horizontal"
    >
      <ResizablePanel minSize={15} defaultSize={20} className="bg-card-secondary h-full">
        <Vertical className="w-full h-full">
          <Horizontal justify="between" align="center" className="pl-4">
            <span className="text-xs text-neutral-500 truncate">
              폴더 탐색기
            </span>
            <CreateFolderButton />
          </Horizontal>
          <Separator orientation="horizontal" className="mb-4" />
          <ScrollArea className="w-full h-full overflow-auto">
            <NoteFolderList data={data?.data} selectedFolder={selectedFolder} onClickFolder={setSelectedFolder} />
          </ScrollArea>
        </Vertical>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={60} defaultSize={80}>
        {children ? children(selectedFolder, setSelectedFolder, data?.data || []) : null}
      </ResizablePanel>
    </ResizablePanelGroup>

  );
};

export default ResizableBoxWithNoteFolderSidebar;