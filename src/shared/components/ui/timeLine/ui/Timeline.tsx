import { cn } from "@/shared/lib/utils";
import { TIMELINE_UNIT } from "../model/contants";

interface TimelineProps {
  hoverIndex: number | null;
}

function Timeline({ hoverIndex }: TimelineProps) {
  return (
    <div>
      {
        TIMELINE_UNIT.map((unit, index) => (
          <TimelineRow key={unit} unit={unit} isHover={hoverIndex === index} />
        ))
      }
    </div>
  );
};

export default Timeline;

interface TimelineRowProps {
  unit: string;
  isHover: boolean;
}

function TimelineRow({ unit, isHover }: TimelineRowProps) {
  return (
    <div className={cn("border-b h-6 flex items-center", { "bg-muted": isHover })}>
      <div className="w-[50px] text-sm select-none">
        {unit}
      </div>
    </div>
  )
}