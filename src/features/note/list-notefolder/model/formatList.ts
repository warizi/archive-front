import type { NoteFolderWithIdPresent } from "@/entities/note";
import _ from "lodash";


export function flattenFolders(nodes: NoteFolderWithIdPresent[]): NoteFolderWithIdPresent[] {
  return _.flatMap(_.sortBy(nodes, "sortOrder"), (n) => {
    const { child = [], ...rest } = n;
    return [{ ...rest, child: [] } as NoteFolderWithIdPresent, ...flattenFolders(child)];
  });
}

export function unflattenFoldersPreserveMeta(
  flat: NoteFolderWithIdPresent[],
  opts: { strict?: boolean } = {}
): NoteFolderWithIdPresent[] {
  const { strict = false } = opts;

  // 1) 사본 생성(child 초기화만)
  const byId = new Map<number, NoteFolderWithIdPresent>();
  flat.forEach(n => byId.set(n.id as number, { ...n, child: [] }));

  // 2) parentId로 연결
  const roots: NoteFolderWithIdPresent[] = [];
  for (const n of byId.values()) {
    if (n.parentId == null) {
      roots.push(n);
    } else {
      const p = byId.get(n.parentId as number);
      if (!p) {
        if (strict) throw new Error(`Missing parentId=${n.parentId} for id=${n.id}`);
        // 부모가 없으면 루트로 승격 (path/depth도 그대로 보존)
        n.parentId = null;
        roots.push(n);
      } else {
        p.child.push(n);
      }
    }
  }

  // 3) 형제 정렬만 수행 (node의 sortOrder/path/depth 값은 보존)
  const sortSiblings = (nodes: NoteFolderWithIdPresent[]) => {
    nodes.sort(
      (a, b) =>
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0) ||
        (a.id as number) - (b.id as number)
    );
    nodes.forEach(n => { if (n.child?.length) sortSiblings(n.child); });
  };
  sortSiblings(roots);

  return roots;
}

function buildIndex(list: NoteFolderWithIdPresent[]) {
  const flat = flattenFolders(list);
  return new Map<string, NoteFolderWithIdPresent>(flat.map(n => [String(n.id), n]));
}

type GetParentPathOptions = {
  includeSelf?: boolean; // 기본 false: 부모들만, true: 자기 자신까지
};

export function getParentPath(
  id: string | number,
  list: NoteFolderWithIdPresent[],
  opts: GetParentPathOptions = {}
): string {
  const byId = buildIndex(list);

  const parts: string[] = [];
  const seen = new Set<string>();
  let cur = byId.get(String(id));

  if (!cur) return "";

  if (opts.includeSelf) parts.push(cur.name);

  while (cur.parentId != null) {
    const pid = String(cur.parentId);
    if (seen.has(pid)) break;        // 순환 참조 방지
    seen.add(pid);

    const parent = byId.get(pid);
    if (!parent) break;              // 데이터 불일치 보호
    parts.push(parent.name);
    cur = parent;
  }

  return parts.length ? `root/${parts.reverse().join("/")}` : "root";
}

export function getDepth(
  id: string | number,
  list: NoteFolderWithIdPresent[]
): number {
  const byId = buildIndex(list);
  let cur = byId.get(String(id));
  if (!cur) return -1;

  let depth = 0;
  const seen = new Set<string>();

  while (cur.parentId != null) {
    const pid = String(cur.parentId);
    if (seen.has(pid)) break; // 순환 참조 보호
    seen.add(pid);

    const parent = byId.get(pid);
    if (!parent) break;       // 데이터 불일치 보호(여기까지를 깊이로 인정)
    depth += 1;
    cur = parent;
  }
  return depth;
}

// 트리 "참조"를 보존하는 인덱스
function buildRefIndex(list: NoteFolderWithIdPresent[]) {
  const byId = new Map<string, NoteFolderWithIdPresent>();
  const roots: NoteFolderWithIdPresent[] = [];

  const walk = (nodes: NoteFolderWithIdPresent[]) => {
    for (const n of nodes) {
      byId.set(String(n.id), n);
      if (n.child && n.child.length) walk(n.child);
    }
  };
  walk(list);

  // 루트 수집 (parentId === null)
  for (const n of byId.values()) if (n.parentId == null) roots.push(n);
  return { byId, roots };
}

function getChildrenRef(
  parentId: string | number | null,
  byId: Map<string, NoteFolderWithIdPresent>,
  roots: NoteFolderWithIdPresent[]
): NoteFolderWithIdPresent[] | undefined {
  if (parentId == null) return roots;
  const p = byId.get(String(parentId));
  return p?.child;
}

// 마지막 sortOrder (없으면 -1)
export function getLastOrderByParentId(
  parentId: string | number | null,
  list: NoteFolderWithIdPresent[]
): number {
  const { byId, roots } = buildRefIndex(list);
  const children = getChildrenRef(parentId, byId, roots);
  if (!children || children.length === 0) return -1;

  // 자식이 정렬되어 있다는 보장이 없다면 max로 계산
  let max = -1;
  for (const c of children) {
    const v = (c.sortOrder ?? 0);
    if (v > max) max = v;
  }
  return max;
}

// 자식들의 sortOrder 재부여 (기본 1-base)
export function setChildOrderByParentId(
  parentId: string | number | null,
  list: NoteFolderWithIdPresent[],
  startAt = 1
): void {
  const { byId, roots } = buildRefIndex(list);
  const children = getChildrenRef(parentId, byId, roots);
  if (!children || children.length === 0) return;

  // 우선 현재 기준으로 정렬(동점 시 id 보조키)
  children.sort((a, b) =>
    (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.id as number) - (b.id as number)
  );

  // 재부여
  children.forEach((child, idx) => {
    child.sortOrder = startAt + idx;
  });
}