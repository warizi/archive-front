import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/resizable";
import RepeatTodoCard from "./RepeatTodoCard";
import TodoCard from "./TodoCard";
import TimelineCard from "./TimelineCard";

function TimeBlock() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-[1200px] h-[calc(100vh-200px)]"
    >
      <ResizablePanel defaultSize={35} minSize={27}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={40} minSize={30}>
            <RepeatTodoCard />
          </ResizablePanel>
          <ResizableHandle className="my-2"/>
          <ResizablePanel defaultSize={60} minSize={30}>
            <TodoCard />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle className="mx-2" />
      <ResizablePanel defaultSize={65} minSize={50}>
        <TimelineCard />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default TimeBlock;