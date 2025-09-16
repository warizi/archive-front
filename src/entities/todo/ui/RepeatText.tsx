import type { TodoWithIdPresent } from "../model/Todo";
import { TODO_REPEAT_FREQUENCY, WEEKDAYS } from "../model/TodoRepeat";

interface RepeatTextProps {
  data: TodoWithIdPresent
}
function RepeatText({ data }: RepeatTextProps) {
  const isRepeat = !!data?.repeat;
  if (!isRepeat) return null;

  const text = getFrequencyText(data) + " 반복";

  return (
    <div>
      <span className="text-xs text-gray-500">{text}</span>
    </div>
  );
};

export default RepeatText;

const sortedWeekdays = {
  [WEEKDAYS.MONDAY]: 0,
  [WEEKDAYS.TUESDAY]: 1,
  [WEEKDAYS.WEDNESDAY]: 2,
  [WEEKDAYS.THURSDAY]: 3,
  [WEEKDAYS.FRIDAY]: 4,
  [WEEKDAYS.SATURDAY]: 5,
  [WEEKDAYS.SUNDAY]: 6
};

// helper
function getFrequencyText(data: TodoWithIdPresent): string {
  const frequency: typeof TODO_REPEAT_FREQUENCY[keyof typeof TODO_REPEAT_FREQUENCY] = data.repeat?.frequency ?? "";
  switch (frequency) {
    case TODO_REPEAT_FREQUENCY.DAILY:
      return "매일";
    case TODO_REPEAT_FREQUENCY.WEEKLY:
      { const dayOfWeek = data.repeat?.dayOfWeek || [];
        const dayOfWeekText = dayOfWeek.sort(
          (a, b) =>
            (sortedWeekdays[a as keyof typeof sortedWeekdays] ?? 0) -
            (sortedWeekdays[b as keyof typeof sortedWeekdays] ?? 0)
        ).map(getDayOfWeekText).join(", ");
        return `매주: ${dayOfWeekText}`; 
      }
    case TODO_REPEAT_FREQUENCY.MONTHLY:
      return `매월: ${data.repeat?.dayOfMonth ?? 1}일`;
    case TODO_REPEAT_FREQUENCY.YEARLY:
        
      { const date = data.repeat?.date;
        const splitedDate = date ? date.split("T")[0].split("-") : [];
      return `매년: ${splitedDate[1] ?? 1}월 ${splitedDate[2] ?? 1}일`; }
    default:
      return "없음";
  }
}

function getDayOfWeekText(dayOfWeek: typeof WEEKDAYS[keyof typeof WEEKDAYS]): string {
  switch (dayOfWeek) {
    case WEEKDAYS.MONDAY:
      return "월";
    case WEEKDAYS.TUESDAY:
      return "화";
    case WEEKDAYS.WEDNESDAY:
      return "수";
    case WEEKDAYS.THURSDAY:
      return "목";
    case WEEKDAYS.FRIDAY:
      return "금";
    case WEEKDAYS.SATURDAY:
      return "토";
    case WEEKDAYS.SUNDAY:
      return "일";
    default:
      return "알 수 없음";
  }
}