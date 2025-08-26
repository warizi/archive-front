import { categorySchema } from "@/entities/catogory";
import z from "zod";
import { todoSubSchema } from "./TodoSub";
import { todoRepeatSchema } from "./TodoRepeat";

export const IMPORTANCE = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  none: ''
}

export const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);
export const MINUTES = ["00", "30"] as const;

export type Hour = typeof HOURS[number];   // "00" | "01" | ... | "23"
export type Minute = typeof MINUTES[number]; // "00" | "30"
export type Time = `${Hour}:${Minute}`;

// 기존 형태(값=라벨)도 필요하면 안전하게 생성
export const TODO_TIME = {
  hour: Object.fromEntries(HOURS.map(h => [h, h])) as Record<Hour, Hour>,
  minute: Object.fromEntries(MINUTES.map(m => [m, m])) as Record<Minute, Minute>,
} as const;

// UI 옵션 배열이 더 쓰기 편함
export const HOUR_OPTIONS = HOURS.map(h => ({ label: h, value: h }));
export const MINUTE_OPTIONS = MINUTES.map(m => ({ label: m, value: m }));

export const TODO_VALID = {
  title: {
    required: true,
    min: 1,
    max: 100
  },
  description: {
    max: 500
  }
}
 
export const TimeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):(?:00|30)$/);

export const TODO_ERROR_MESSAGE = {
  title: {
    required: "할 일 제목 입력은 필수입니다.",
    min: `할 일 제목은 최소 ${TODO_VALID.title.min}자 이상이어야 합니다.`,
    max: `할 일 제목은 최대 ${TODO_VALID.title.max}자까지 입력할 수 있습니다.`
  },
  description: {
    max: `할 일 설명은 최대 ${TODO_VALID.description.max}자까지 입력할 수 있습니다.`
  },
  endDate: {
    invalid: "종료일은 시작일 이후여야 합니다."
  }
}

const YMD = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    error: TODO_ERROR_MESSAGE.title.required
  })
  .trim()
  .min(2, {
    message: TODO_ERROR_MESSAGE.title.min
  }).max(100, {
    message: TODO_ERROR_MESSAGE.title.max
  }),
  description: z.string().max(500, {
    message: TODO_ERROR_MESSAGE.description.max
  }).optional(),
  completed: z.boolean(),
  completedDate: YMD.optional(),
  order: z.number().min(0).optional(),
  category: categorySchema.required({ id: true }).optional(),
  startDate: YMD.optional(),
  endDate: YMD.optional(),
  importance: z.enum([IMPORTANCE.low, IMPORTANCE.medium, IMPORTANCE.high, IMPORTANCE.none]).optional(),
  subTodo: z.array(todoSubSchema).optional(),
  time: TimeSchema.optional(),
  repeat: todoRepeatSchema.optional(),
})

export type TodoType = z.infer<typeof todoSchema>;

export type TodoWithIdPresent = TodoType & Required<Pick<TodoType, 'id'>>;

export type TodoCreateType = Omit<TodoType, "id">;