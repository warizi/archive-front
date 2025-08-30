import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useEdgeAutoScroll } from "../model/hooks";
import Timeline from "./Timeline";

function TimelineCard() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  
  const [ isDrag, setIsDrag ] = useState(false);

  const handleDragStart = () => {
    setIsDrag(true);
  }

  const handleDragEnd = () => {
    setIsDrag(false);
  }

  const index = useEdgeAutoScroll(viewportRef, {
    edge: 80,
    maxSpeed: 5,
    vertical: true,
    horizontal: false,
    enabled: isDrag,
    itemHeight: 24,
  });

  return (
    <Card className="p-0 pt-4 min-w-0 max-w-[1000px] h-[calc(100vh-60px)] flex flex-col gap-2 min-h-0"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <CardHeader className="shrink-0">
        <CardTitle>
          타임라인
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 min-h-0 border">
        <ScrollArea ref={viewportRef} className="h-full">
          <Timeline hoverIndex={index}/>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;