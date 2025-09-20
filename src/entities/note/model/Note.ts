import z from "zod";

export const NOTE_QUERY_KEY = {
  list: "noteList",
  count: "noteCount",
  detail: "noteDetail"
}

export const NOTE_VALID = {
  title: {
    min: 1,
    max: 200
  }
}

export const NOTE_ERROR_MESSAGE = {
  title: {
    required: "노트 제목은 입력은 필수입니다.",
    min: `노트 제목은 최소 ${NOTE_VALID.title.min}자 이상이어야 합니다.`,
    max: `노트 제목은 최대 ${NOTE_VALID.title.max}자 이하이어야 합니다.`
  }
}

export const noteSchema = z.object({
  id: z.number().optional(),
  folderId: z.number(),
  title: z.string({
    error: NOTE_ERROR_MESSAGE.title.required
  }).min(1, { error: NOTE_ERROR_MESSAGE.title.min }).max(NOTE_VALID.title.max, { error: NOTE_ERROR_MESSAGE.title.max }),
  contentJson: z.any(),
  sortOrder: z.number().int().optional(),
});

export type NoteType = z.infer<typeof noteSchema>;

export type NoteWithIdPresent = NoteType & Required<Pick<NoteType, 'id'>>;

export type NoteCreateType = Omit<NoteType, "id">;
