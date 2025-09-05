import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/resizable";
import { NoteFolderSidebar } from "@/widgets/note";

function NotePage() {
  return (
    <ResizablePanelGroup 
      className="min-h-screen-no-header"
      direction="horizontal"
    >
      <ResizablePanel minSize={15} defaultSize={20} className="bg-card-secondary">
        <NoteFolderSidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={60} defaultSize={80}>

      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default NotePage;