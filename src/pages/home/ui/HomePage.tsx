import { ScrollArea } from "@/shared/components/ui/scroll-area";
import Vertical from "@/shared/components/ui/Vertical";
import { CountWidget, NoteWidgets, TodoWidgets } from "@/widgets/dashboard";

function HomePage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <ScrollArea className="w-full h-full max-w-[1400px]">
        <Vertical className="w-full h-full max-w-[1400px] gap-4">
            <CountWidget />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TodoWidgets />
              <NoteWidgets />
            </div>
        </Vertical>
      </ScrollArea>
    </div>
  );
};

export default HomePage;