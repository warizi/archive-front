import { TODO_REPEAT_FREQUENCY, WEEKDAYS } from "@/entities/todo";
import { MONTH_DAYS, type TodoRepeat } from "@/entities/todo/model/TodoRepeat";
import DatePicker from "@/shared/components/ui/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group";

interface RepeatControlProps {
  parentId: number;
  repeat: TodoRepeat | undefined;
  onRepeatChange: (repeat: TodoRepeat | undefined) => void;
}

function RepeatControl({ parentId, repeat, onRepeatChange }: RepeatControlProps) {
  const handleRepeatChange = (frequency: string | undefined) => {
    if (!frequency) {
      onRepeatChange(undefined);
    } else {
      onRepeatChange({
        parentId,
        frequency
      });
    }
  };

  const handleDaysOfWeekChange = (days: string[]) => {
    onRepeatChange({
      parentId,
      frequency: TODO_REPEAT_FREQUENCY.WEEKLY,
      dayOfWeek: days
    });
  };

  const handleDayOfMonthChange = (dayOfMonth: string | undefined) => {
    onRepeatChange({
      parentId,
      frequency: TODO_REPEAT_FREQUENCY.MONTHLY,
      dayOfMonth: dayOfMonth
    });
  };

  const handleDateChange = (date: string | undefined) => {
    onRepeatChange({
      parentId,
      frequency: TODO_REPEAT_FREQUENCY.YEARLY,
      date
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup type="single" variant={"outline"} value={repeat?.frequency ?? ""} onValueChange={handleRepeatChange}>
        <ToggleGroupItem className="px-3" value={TODO_REPEAT_FREQUENCY.DAILY}>매일</ToggleGroupItem>
        <ToggleGroupItem className="px-3" value={TODO_REPEAT_FREQUENCY.WEEKLY}>매주</ToggleGroupItem>
        <ToggleGroupItem className="px-3" value={TODO_REPEAT_FREQUENCY.MONTHLY}>매월</ToggleGroupItem>
        <ToggleGroupItem className="px-3" value={TODO_REPEAT_FREQUENCY.YEARLY}>매년</ToggleGroupItem>
      </ToggleGroup>
      {
        repeat?.frequency === TODO_REPEAT_FREQUENCY.WEEKLY && (
          <ToggleGroup type="multiple" variant={"outline"} value={repeat?.dayOfWeek ?? []} onValueChange={handleDaysOfWeekChange}>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.MONDAY}>월</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.TUESDAY}>화</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.WEDNESDAY}>수</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.THURSDAY}>목</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.FRIDAY}>금</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.SATURDAY}>토</ToggleGroupItem>
            <ToggleGroupItem className="px-3" value={WEEKDAYS.SUNDAY}>일</ToggleGroupItem>
          </ToggleGroup>
        ) 
      }
      {
        repeat?.frequency === TODO_REPEAT_FREQUENCY.MONTHLY && (
          <div className="flex gap-2 items-center">
            <Select value={String(repeat?.dayOfMonth || "")} onValueChange={(value) => handleDayOfMonthChange(value || undefined)}>
              <SelectTrigger>
                <SelectValue placeholder="날짜 선택" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MONTH_DAYS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            일
          </div>
        )
      }
      {
        repeat?.frequency === TODO_REPEAT_FREQUENCY.YEARLY && (
          <DatePicker date={repeat?.date} onDateChange={handleDateChange} />
        )
      }
    </div>
  );
};

export default RepeatControl;