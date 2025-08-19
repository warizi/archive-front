import z from "zod";

export const TODO_CATEGORY_VALID = {
  TITLE: { min: 2, max: 30 },
  DESCRIPTION: { min: 0, max: 100 },
};

const TODO_CATEGORY_ERROR_MESSAGE = {
  TITLE: {
    REQUIRED: "제목은 필수입니다.",
    MIN_LENGTH: "제목은 최소 2자 이상이어야 합니다.",
    MAX_LENGTH: "제목은 최대 30자 이하여야 합니다.",
  },
  DESCRIPTION: {
    REQUIRED: "설명은 필수입니다.",
    MIN_LENGTH: "설명은 최소 0자 이상이어야 합니다.",
    MAX_LENGTH: "설명은 최대 100자 이하여야 합니다.",
  },
} as const;

const title = z.string({
  error: (iss) => 
    iss.input === undefined ? TODO_CATEGORY_ERROR_MESSAGE.TITLE.REQUIRED : undefined,
})
.trim()
.min(TODO_CATEGORY_VALID.TITLE.min, { error: TODO_CATEGORY_ERROR_MESSAGE.TITLE.MIN_LENGTH })
.max(TODO_CATEGORY_VALID.TITLE.max, { error: TODO_CATEGORY_ERROR_MESSAGE.TITLE.MAX_LENGTH });

const description = z.string({
  error: (iss) =>
    iss.input === undefined ? TODO_CATEGORY_ERROR_MESSAGE.DESCRIPTION.REQUIRED : undefined,
})
.trim()
.min(TODO_CATEGORY_VALID.DESCRIPTION.min, { error: TODO_CATEGORY_ERROR_MESSAGE.DESCRIPTION.MIN_LENGTH })
.max(TODO_CATEGORY_VALID.DESCRIPTION.max, { error: TODO_CATEGORY_ERROR_MESSAGE.DESCRIPTION.MAX_LENGTH });

const colorHex = z.string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "헥사코드는 # + 6자리여야 합니다.")
  .optional();

export const todoCategorySchema = z.object({
  id: z.number().optional(),
  title,
  description,
  colorHex,
});

export type TodoCategory = z.infer<typeof todoCategorySchema>;