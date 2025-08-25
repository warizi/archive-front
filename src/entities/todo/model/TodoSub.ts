import z from "zod"

export const TODO_SUB_VALID = {
  title: {
    required: true,
    min: 1,
    max: 100
  }
}

export const TODO_SUB_ERROR_MESSAGE = {
  title: {
    required: "서브 할 일 제목 입력은 필수입니다.",
    min: `서브 할 일 제목은 최소 ${TODO_SUB_VALID.title.min}자 이상이어야 합니다.`,
    max: `서브 할 일 제목은 최대 ${TODO_SUB_VALID.title.max}자까지 입력할 수 있습니다.`
  }
}

export const todoSubSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    error: TODO_SUB_ERROR_MESSAGE.title.required
  }).min(1, {
    message: TODO_SUB_ERROR_MESSAGE.title.min
  }).max(100, {
    message: TODO_SUB_ERROR_MESSAGE.title.max
  }),
  completed: z.boolean(),
  order: z.number().min(0).optional(),
  parentId: z.number()
});

export type TodoSubType = z.infer<typeof todoSubSchema>;

export type TodoSubWithIdPresent = TodoSubType & Required<Pick<TodoSubType, 'id'>>;

export type TodoSubCreateType = Omit<TodoSubType, "id">;