import z from "zod";

export const WEEKDAYS = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday'
}

export const TODO_REPEAT_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
}

// frequency가 daily인 경우 daysOfWeek 없어야함, date 없어야함
// frequency가 weekly인 경우 daysOfWeek 필수, date 없어야함
// frequency가 monthly인 경우 daysOfWeek 없어야함, date 필수
// frequency가 yearly인 경우 daysOfWeek 없어야함, date 필수
export const todoRepeatSchema = z.object({
  id: z.number().optional(),
  todoId: z.number(),
  frequency: z.enum(Object.values(TODO_REPEAT_FREQUENCY)),
  daysOfWeek: z.array(z.enum(Object.values(WEEKDAYS))).optional(),
  date: z.date().optional()
})
  .superRefine((data, ctx) => {
    const f = data.frequency;
    const hasDOW = typeof data.daysOfWeek !== "undefined";
    const hasDate = typeof data.date !== "undefined";

    // DAILY: daysOfWeek, date 모두 없어야 함
    if (f === TODO_REPEAT_FREQUENCY.DAILY) {
      if (hasDOW) {
        ctx.addIssue({
          code: "custom",
          path: ["daysOfWeek"],
          message: "daily에서는 daysOfWeek가 없어야 합니다.",
        });
      }
      if (hasDate) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: "daily에서는 date가 없어야 합니다.",
        });
      }
    }

    // WEEKLY: daysOfWeek 필수, date 없어야 함
    if (f === TODO_REPEAT_FREQUENCY.WEEKLY) {
      if (!hasDOW || (data.daysOfWeek && data.daysOfWeek.length === 0)) {
        ctx.addIssue({
          code: "custom",
          path: ["daysOfWeek"],
          message: "weekly에서는 daysOfWeek가 최소 1개 필요합니다.",
        });
      }
      if (hasDate) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: "weekly에서는 date가 없어야 합니다.",
        });
      }
    }

    // MONTHLY/YEARLY: date 필수, daysOfWeek 없어야 함
    if (
      f === TODO_REPEAT_FREQUENCY.MONTHLY ||
      f === TODO_REPEAT_FREQUENCY.YEARLY
    ) {
      if (hasDOW) {
        ctx.addIssue({
          code: "custom",
          path: ["daysOfWeek"],
          message: `${f}에서는 daysOfWeek가 없어야 합니다.`,
        });
      }
      if (!hasDate) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: `${f}에서는 date가 필수입니다.`,
        });
      }
    }
  });

export type TodoRepeat = z.infer<typeof todoRepeatSchema>;

export type TodoRepeatWithIdPresent = TodoRepeat & Required<Pick<TodoRepeat, 'id'>>;

export type TodoRepeatCreateType = Omit<TodoRepeat, "id">;
