import type { TodoWithIdPresent } from "../model/Todo";

interface PeriodTextProps {
  data: TodoWithIdPresent
}
function PeriodText({ data }: PeriodTextProps) {
  return (
    <div>
      <span className="text-xs text-gray-500">{data.startDate}</span>
      {
        data.endDate && (
          <span className="text-xs text-gray-500">- {data.endDate}</span>
        )
      }
    </div>
  );
};

export default PeriodText;