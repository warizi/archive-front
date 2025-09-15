import { z } from "zod";

export const NOTE_FOLDER_VALID = {
  name: {
    min: 2,
    max: 100
  },
  description: {
    max: 200
  }
};

export const NOTE_FOLDER_ERROR_MESSAGE = {
  name: {
    required: "폴더 이름은 입력은 필수입니다.",
    min: `폴더 이름은 최소 ${NOTE_FOLDER_VALID.name.min}자 이상이어야 합니다.`,
    max: `폴더 이름은 최대 ${NOTE_FOLDER_VALID.name.max}자 이하이어야 합니다.`
  },
  description: {
    max: `설명은 최대 ${NOTE_FOLDER_VALID.description.max}자 이하이어야 합니다.`
  }
};

export const noteFolderSchema = z.object({
  id: z.number().optional(),
  parentId: z.number().optional().nullable(),
  name: z.string({
    error: NOTE_FOLDER_ERROR_MESSAGE.name.required
  }).min(1, { error: NOTE_FOLDER_ERROR_MESSAGE.name.min }).max(NOTE_FOLDER_VALID.name.max, { error: NOTE_FOLDER_ERROR_MESSAGE.name.max }),
  description: z.string().max(NOTE_FOLDER_VALID.description.max, { error: NOTE_FOLDER_ERROR_MESSAGE.description.max }).optional(), 
  depth: z.number().int().min(0).max(3),
  sortOrder: z.number().int().optional(),
});

export const noteFolderCreateSchema = noteFolderSchema.omit({ id: true });

export type NoteFolderType = z.infer<typeof noteFolderSchema>;

export interface NoteFolder extends NoteFolderType {
  child: NoteFolderWithIdPresent[];
}

export type NoteFolderWithIdPresent = NoteFolder & Required<Pick<NoteFolder, 'id'>>;

export type NoteFolderCreateType = z.infer<typeof noteFolderCreateSchema>;


export function findNodeWithParent(
  nodes: NoteFolderWithIdPresent[], id: number, parent: NoteFolderWithIdPresent | null = null
): { node: NoteFolderWithIdPresent; parent: NoteFolderWithIdPresent | null; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.id === id) return { node: n, parent, index: i };
    if (n.child?.length) {
      const r = findNodeWithParent(n.child, id, n);
      if (r) return r;
    }
  }
  return null;
}

export function containsId(root: NoteFolderWithIdPresent, id: number): boolean {
  if (root.id === id) return true;
  return root.child?.some(c => containsId(c, id)) ?? false;
}

export function renumber(arr: NoteFolderWithIdPresent[]) {
  for (let i = 0; i < arr.length; i++) arr[i].sortOrder = i + 1;
}

export function recalcDepth(roots: NoteFolderWithIdPresent[]) {
  const dfs = (node: NoteFolderWithIdPresent, parent: NoteFolderWithIdPresent | null) => {
    node.depth = parent ? parent.depth + 1 : 0;
    if (node.child?.length) {
      renumber(node.child);
      node.child.forEach(c => dfs(c, node));
    }
  };
  renumber(roots);
  roots.forEach(r => dfs(r, null));
}
