import { cn } from "@/shared/lib/utils";
import type { TodoWithIdPresent } from "../model/Todo";
import { CategoryTag } from "@/entities/catogory";
import PeriodText from "./PeriodText";
import RepeatText from "./RepeatText";
import { Dot } from "lucide-react";
import { IMPORTANCE_COLOR } from "../model/ImportanceColor";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card";
interface TodoProps {
  data: TodoWithIdPresent
  onClick?: (todo: TodoWithIdPresent) => void;
  className?: string;
}

function Todo({ data, onClick, className }: TodoProps) {

  const importanceColor =
    data.importance === "high" ? IMPORTANCE_COLOR.high
    : data.importance === "medium" ? IMPORTANCE_COLOR.medium
    : IMPORTANCE_COLOR.low;

  return (
    <HoverCard openDelay={1000}>
      <div className="flex flex-col">
        <div 
          className={cn(`flex flex-row gap-2 min-h-[35px] pl-2 cursor-pointer`, className)} 
          onClick={() => onClick?.(data)}
        >
          {data?.category && (
            <div className="shrink-0 pt-2">
              <CategoryTag category={data.category} />
            </div>
          )}
          <HoverCardTrigger asChild>
            <div className="flex-1 min-w-0 flex flex-col py-2">
              <div className="w-full flex items-center gap-2">
                {data?.importance && <Dot size={6} className={`scale-600 shrink-0`} color={importanceColor}/>}
                <span
                  className={cn(
                    "block truncate text-sm", // truncate = overflow-hidden + text-ellipsis + whitespace-nowrap
                    { "line-through text-gray-700": data.completed }
                  )}
                >
                  {data.title}
                </span>
              </div>
              {
                data.startDate && (
                  <PeriodText data={data} />
                )
              }
              <RepeatText data={data} />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="p-2">
            <span className="md:text-sm">{data.title}</span>
          </HoverCardContent>
        </div>
      </div>
    </HoverCard>
  );
};

export default Todo;