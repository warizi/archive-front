import { categorySchema } from "@/entities/catogory";
import z from "zod";
import { todoSubSchema } from "./TodoSub";

const IMPORTANCE = {
  low: 'low',
  medium: 'medium',
  high: 'high'
}

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

export const TODO_ERROR_MESSAGE = {
  title: {
    required: "할 일 제목 입력은 필수입니다.",
    min: `할 일 제목은 최소 ${TODO_VALID.title.min}자 이상이어야 합니다.`,
    max: `할 일 제목은 최대 ${TODO_VALID.title.max}자까지 입력할 수 있습니다.`
  },
  description: {
    max: `할 일 설명은 최대 ${TODO_VALID.description.max}자까지 입력할 수 있습니다.`
  }
}

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    error: TODO_ERROR_MESSAGE.title.required
  }).min(2, {
    message: TODO_ERROR_MESSAGE.title.min
  }).max(100, {
    message: TODO_ERROR_MESSAGE.title.max
  }),
  description: z.string().max(500, {
    message: TODO_ERROR_MESSAGE.description.max
  }).optional(),
  completed: z.boolean().default(false),
  order: z.number().min(0).optional(),
  category: categorySchema.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  importance: z.enum([IMPORTANCE.low, IMPORTANCE.medium, IMPORTANCE.high]).optional(),
  subTodo: z.array(todoSubSchema.omit({ id: true })).optional()
});

export type TodoType = z.infer<typeof todoSchema>;

export type TodoWithIdPresent = TodoType & Required<Pick<TodoType, 'id'>>;

export type CategoryCreateType = Omit<TodoType, "id">;