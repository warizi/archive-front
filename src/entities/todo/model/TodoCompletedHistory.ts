import z from "zod";
import { IMPORTANCE } from "./Todo";

export const todoCompletedHistorySchema = z.object({
  id: z.number().int().positive(),
  type: z.enum(["TODO", "REPEAT"]),
  title: z.string().min(1).max(100),
  description: z.string().max(500).nullable().optional(),
  completed: z.literal(true),
  completedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  sortOrder: z.number().int().nullable().optional(),
  categoryId: z.number().int().nullable().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  // 필요 시 Importance 값셋을 실제 서버 enum에 맞춰 조정
  importance: z.enum([IMPORTANCE.low, IMPORTANCE.medium, IMPORTANCE.high, IMPORTANCE.none]).nullable().optional(),
  time: z.string().regex(/^([01]\d|2[0-3]):(00|30)$/, "HH:mm (00/30 분만)").nullable().optional(),
});

export const todoCompletedHistoryCursorSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  typeRank: z.union([z.literal(1), z.literal(2)]), // 1=TODO, 2=REPEAT
  id: z.number().int().positive(),
});

export const completedTodoHistoryResponseSchema = z.object({
  items: z.array(todoCompletedHistorySchema),
  nextCursor: todoCompletedHistoryCursorSchema.nullable(),
  hasNext: z.boolean(),
});



export type TodoCompletedHistory = z.infer<typeof todoCompletedHistorySchema>;
export type TodoCompletedHistoryCursor = z.infer<typeof todoCompletedHistoryCursorSchema>;
export type CompletedTodoHistoryResponse = z.infer<typeof completedTodoHistoryResponseSchema>;