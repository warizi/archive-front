import { ChevronDownIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { useState } from "react";
import { toDate, toYMD } from "@/shared/lib/utils";

interface DatePickerProps {
  date?: string | undefined;
  onDateChange?: (date: string | undefined) => void;
  disabled?: boolean;
}

function DatePicker({ date, onDateChange, disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-36 justify-between font-normal"
          disabled={disabled}
        >
          {date ? date : "날짜 선택"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={toDate(date)}
          captionLayout="dropdown"
          onSelect={(date) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onDateChange && onDateChange(toYMD(date))
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;