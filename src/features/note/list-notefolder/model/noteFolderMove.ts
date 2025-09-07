import type { NoteFolderWithIdPresent } from "@/entities/note";
import { containsId, findNodeWithParent, recalcDepth, renumber } from "@/entities/note/model/NoteFolder";

type Drop =
  | { type: "root" }
  | { type: "inside"; targetId: number }
  | { type: "after";  targetId: number }; // bottom 대신 after로 명확화

export function parseDrop(overId: string): Drop | null {
  if (overId === "droppable-note-folder") return { type: "root" };
  if (overId.startsWith("droppable-inside-"))  return { type: "inside", targetId: +overId.replace("droppable-inside-","") };
  if (overId.startsWith("droppable-bottom-"))  return { type: "after",  targetId: +overId.replace("droppable-bottom-","") };
  return null;
}

function getSubtreeDepth(node: NoteFolderWithIdPresent): number {
  if (!node.child?.length) return 0;
  let max = 0;
  for (const c of node.child) max = Math.max(max, 1 + getSubtreeDepth(c));
  return max;
}

function canMoveToParent(
  moving: NoteFolderWithIdPresent,
  newParent: NoteFolderWithIdPresent | null,
  maxDepth = 3
): boolean {
  // const newParentDepth = newParent ? newParent.depth : 0 - 1; // 루트의 자식이 depth 0이 되도록
  const subtree = getSubtreeDepth(moving);
  const resultingDepth = (newParent ? newParent.depth + 1 : 0) + subtree;
  return resultingDepth <= maxDepth;
}

export function moveNode(
  roots: NoteFolderWithIdPresent[],
  activeId: number,
  drop: Drop
): boolean {
  const src = findNodeWithParent(roots, activeId);
  if (!src) return false;

  // 사이클 방지 & 대상 찾기
  let dstParent: NoteFolderWithIdPresent | null = null;
  let dstSiblings: NoteFolderWithIdPresent[] = roots;
  let insertIndex = roots.length;

  if (drop.type === "root") {
    dstParent = null;
    dstSiblings = roots;
    insertIndex = dstSiblings.length;
  } else {
    const t = findNodeWithParent(roots, drop.targetId);
    if (!t) return false;
    if (containsId(src.node, t.node.id)) return false;

    if (drop.type === "inside") {
      dstParent = t.node;
      dstSiblings = dstParent.child ?? (dstParent.child = []);
      insertIndex = dstSiblings.length;
    } else { // after
      dstParent = t.parent;
      dstSiblings = dstParent ? dstParent.child : roots;
      insertIndex = t.index + 1;
    }
  }

  // 깊이 제한 검증
  if (!canMoveToParent(src.node, dstParent, 100)) return false;

  // 원래 자리에서 제거
  const srcSiblings = src.parent ? src.parent.child : roots;
  const from = src.index;
  srcSiblings.splice(from, 1);
  renumber(srcSiblings);

  // 같은 부모 내 앞→뒤로 이동 시 인덱스 보정
  if (dstSiblings === srcSiblings && from < insertIndex) insertIndex--;

  // 삽입 + parentId 갱신
  src.node.parentId = dstParent ? dstParent.id : null;
  dstSiblings.splice(Math.min(insertIndex, dstSiblings.length), 0, src.node);
  renumber(dstSiblings);

  // 전체 재계산
  recalcDepth(roots);
  return true;
}
