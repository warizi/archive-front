import type { TodoWithIdPresent } from "@/entities/todo";
import DatePicker from "@/shared/components/ui/DatePicker";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/components/ui/form";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

function PeriodControl() {
  const { control, setValue } = useFormContext<TodoWithIdPresent>();
  const startDate = useWatch({ control, name: "startDate" });
  const endDate   = useWatch({ control, name: "endDate" });

  useEffect(() => {

    // start가 없으면 end도 없애기
    if (!startDate) {
      setValue("endDate", undefined, { shouldDirty: true, shouldValidate: true });
    }
    // start만 있고 end가 없으면 end = start
    if (startDate && !endDate) {
      setValue("endDate", startDate, { shouldDirty: true, shouldValidate: true });
    }
    // end < start면 end = start
    if (startDate && endDate && endDate < startDate) {
      setValue("endDate", startDate, { shouldDirty: true, shouldValidate: true });
    }
  }, [startDate, endDate, setValue]);
  return (
    <div className="flex justify-between">
      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>시작일</FormLabel>
            <FormControl>
              <DatePicker date={field.value} onDateChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>종료일</FormLabel>
            <FormControl>
              <DatePicker date={field.value} onDateChange={field.onChange} disabled={!startDate} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PeriodControl;