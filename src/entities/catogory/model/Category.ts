import z from "zod";

export const CATEGORY_VALID = {
  name: {
    required: true,
    min: 2,
    max: 20
  },
  description: {
    max: 200
  },
}

export const CATEGORY_ERROR_MESSAGE = {
  name: {
    required: "카테고리 이름 입력은 필수입니다.",
    min: `카테고리 이름은 최소 ${CATEGORY_VALID.name.min}자 이상이어야 합니다.`,
    max: `카테고리 이름은 최대 ${CATEGORY_VALID.name.max}자 이하이어야 합니다.`
  },
  description: {
    max: `카테고리 설명은 최대 ${CATEGORY_VALID.description.max}자 이하이어야 합니다.`
  }
}

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string({
    error: CATEGORY_ERROR_MESSAGE.name.required
  }).min(1, { error: CATEGORY_ERROR_MESSAGE.name.min }).max(20, { error: CATEGORY_ERROR_MESSAGE.name.max }),
  description: z.string().max(200, { error: CATEGORY_ERROR_MESSAGE.description.max }).optional(),
  colorHex: z.string().max(7).optional(),
  order: z.number().int().min(0).optional()
});


export type CategoryType = z.infer<typeof categorySchema>;

export type CategoryWithIdPresent = CategoryType & Required<Pick<CategoryType, 'id'>>;

export type CategoryCreateType = Omit<CategoryType, "id">;
