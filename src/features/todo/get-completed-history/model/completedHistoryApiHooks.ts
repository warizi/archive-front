import { TODO_QUERY_KEY, type CompletedTodoHistoryResponse, type TodoCompletedHistory, type TodoCompletedHistoryCursor } from "@/entities/todo";
import type { ApiResponse } from "@/shared/type/response";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCompletedTodoHistoryApi } from "../api/getCompletedHistoryApi";

/**
 * 완료 히스토리 무한스크롤 조회 훅
 * - 첫 페이지: cursor = null
 * - 다음 페이지: 서버가 준 nextCursor 사용
 * - 클라이언트에서 중복(id/type) 제거
 */
export function useCompletedTodoHistoryInfiniteQuery(size = 30) {
  return useInfiniteQuery<ApiResponse<CompletedTodoHistoryResponse>, Error, {
    items: TodoCompletedHistory[];
    nextCursor: TodoCompletedHistoryCursor | null;
    hasNext: boolean;
  }>({
    queryKey: TODO_QUERY_KEY.completedHistory(size),
    initialPageParam: null as TodoCompletedHistoryCursor | null,
    queryFn: async ({ pageParam }) => {
      return getCompletedTodoHistoryApi({
        size,
        cursor: (pageParam as TodoCompletedHistoryCursor | null) ?? null,
      });
    },
    getNextPageParam: (lastPage) => {
      const body = lastPage?.data;
      if (!body) return undefined;
      if (!body.hasNext) return undefined;

      // 우선 서버 제공 nextCursor 사용
      if (body.nextCursor) return body.nextCursor;

      // 없으면 마지막 아이템으로 커서 계산
      const items = body.items ?? [];
      if (items.length === 0) return undefined;
      const last = items[items.length - 1];
      return {
        date: last.completedDate,
        typeRank: last.type === "TODO" ? 1 : 2,
        id: last.id,
      } as TodoCompletedHistoryCursor;
    },
    // 평탄화 + 중복 제거
    select: (data) => {
      const seen = new Set<string>();
      const items = data.pages
        .flatMap((p) => p.data.items)
        .filter((it) => {
          const key = `${it.type}-${it.id}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      const last = data.pages[data.pages.length - 1].data;
      const nextCursor =
        last.nextCursor ??
        (items.length
          ? {
              date: items[items.length - 1].completedDate,
              typeRank: items[items.length - 1].type === "TODO" ? 1 : 2,
              id: items[items.length - 1].id,
            }
          : null);

      return { items, nextCursor, hasNext: last.hasNext };
    },
  });
}