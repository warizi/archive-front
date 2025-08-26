import { cn } from "@/shared/lib/utils";
import type { TodoWithIdPresent } from "../model/Todo";
import { CategoryTag } from "@/entities/catogory";
interface TodoProps {
  data: TodoWithIdPresent
  onClick?: (todo: TodoWithIdPresent) => void;
  className?: string;
}

function Todo({ data, onClick, className }: TodoProps) {

  return (
    <div className="flex flex-col">
      <div className={cn(`flex flex-row gap-2 items-center min-h-[35px] pl-2 cursor-pointer`, className)} onClick={() => onClick?.(data)}>
        {data?.category && (
          <div className="shrink-0">
            <CategoryTag category={data.category} />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col py-2">
          <div className="w-full flex justify-between items-center gap-2">
            <span
              className={cn(
                "block truncate text-sm", // truncate = overflow-hidden + text-ellipsis + whitespace-nowrap
                { "line-through text-gray-600": data.completed }
              )}
            >
              {data.title}
            </span>
          </div>
          {
            data.startDate && (
              <div>
                <span className="text-xs text-gray-500">{data.startDate}</span>
                {
                  data.endDate && (
                    <span className="text-xs text-gray-500">- {data.endDate}</span>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Todo;