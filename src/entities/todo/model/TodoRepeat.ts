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

export const MONTH_DAYS = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  "11": "11",
  "12": "12",
  "13": "13",
  "14": "14",
  "15": "15",
  "16": "16",
  "17": "17",
  "18": "18",
  "19": "19",
  "20": "20",
  "21": "21",
  "22": "22",
  "23": "23",
  "24": "24",
  "25": "25",
  "26": "26",
  "27": "27",
  "28": "28",
  "29": "29",
  "30": "30",
  "31": "31"
};

export const TODO_REPEAT_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
}
const YMD = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
// frequency가 daily인 경우 daysOfWeek 없어야함, date 없어야함
// frequency가 weekly인 경우 daysOfWeek 필수, date 없어야함
// frequency가 monthly인 경우 daysOfWeek 없어야함, day 필수
// frequency가 yearly인 경우 daysOfWeek 없어야함, date 필수
export const todoRepeatSchema = z.object({
  id: z.number().optional(),
  parentId: z.number(),
  frequency: z.enum(Object.values(TODO_REPEAT_FREQUENCY)),
  dayOfWeek: z.array(z.enum(Object.values(WEEKDAYS))).optional(),
  dayOfMonth: z.enum(Object.keys(MONTH_DAYS)).optional(),
  date: YMD.optional()
})
.superRefine((data, ctx) => {
  const { frequency, dayOfWeek, dayOfMonth, date } = data;

  if (frequency === TODO_REPEAT_FREQUENCY.WEEKLY && (dayOfWeek?.length === 0 || !dayOfWeek)) {
    ctx.addIssue({
      code: "custom",
      message: "주간 반복 설정에는 요일이 필요합니다.",
      path: ["dayOfWeek"]
    });
  }

  if (frequency === TODO_REPEAT_FREQUENCY.MONTHLY && !dayOfMonth) {
    ctx.addIssue({
      code: "custom",
      message: "월간 반복 설정에는 날짜가 필요합니다.",
      path: ["dayOfMonth"]
    });
  }

  if (frequency === TODO_REPEAT_FREQUENCY.YEARLY && !date) {
    ctx.addIssue({
      code: "custom",
      message: "연간 반복 설정에는 날짜가 필요합니다.",
      path: ["date"]
    });
  }
})

export type TodoRepeat = z.infer<typeof todoRepeatSchema>;

export type TodoRepeatWithIdPresent = TodoRepeat & Required<Pick<TodoRepeat, 'id'>>;

export type TodoRepeatCreateType = Omit<TodoRepeat, "id">;
