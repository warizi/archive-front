import type { TODO_REPEAT_FREQUENCY } from "./TodoRepeat";

export const TODO_QUERY_KEY = {
  LIST: ["todos"],
  CATEGORIZED: (categoryId: number) => ["todos", "category", categoryId],
  REPEAT: ["todos", "repeat"],
  REPEAT_CATEGORIZED: (categoryId: number) => ["todos", "repeat", "category", categoryId],
  detail: (id?: number) => [id],
  completedHistory: (size: number) => ["todo", "completedHistory", size] as const,
  REPEAT_FREQUENCY: (frequency: keyof typeof TODO_REPEAT_FREQUENCY) => ["todos", "repeat", "frequency", frequency]
};
