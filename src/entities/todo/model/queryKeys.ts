export const TODO_QUERY_KEY = {
  LIST: ["todos"],
  CATEGORIZED: (categoryId: number) => ["todos", "category", categoryId],
  REPEAT: ["todos", "repeat"],
  REPEAT_CATEGORIZED: (categoryId: number) => ["todos", "repeat", "category", categoryId],
  detail: (id?: number) => [id]
};
