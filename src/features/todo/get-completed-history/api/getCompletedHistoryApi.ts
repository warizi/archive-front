import type { CompletedTodoHistoryResponse, TodoCompletedHistory, TodoCompletedHistoryCursor } from "@/entities/todo";
import { apiClient } from "@/shared/config/axiosClient";
import type { ApiResponse } from "@/shared/type/response";

export interface GetCompletedTodoHistoryParams {
  size?: number; // 기본 30
  cursor?: TodoCompletedHistoryCursor | null;
}

/** 무한스크롤 히스토리 조회 */
export const getCompletedTodoHistoryApi = async (
  { size = 30, cursor }: GetCompletedTodoHistoryParams
): Promise<ApiResponse<CompletedTodoHistoryResponse>> => {
  const params: Record<string, number | string> = { size };

  if (cursor) {
    params.cursorDate = cursor.date;
    params.cursorTypeRank = cursor.typeRank;
    params.cursorId = cursor.id;
  }

  const response = await apiClient.get("/api/todos/completed/history", { params });
  return response.data; // ApiResponse<CompletedTodoHistoryResponse>
};

/** 다음 커서 생성 헬퍼: 마지막 아이템에서 뽑아씀 */
export const buildNextCompletedHistoryCursor = (
  last: TodoCompletedHistory | undefined | null
): TodoCompletedHistoryCursor | null => {
  if (!last) return null;
  return {
    date: last.completedDate,
    typeRank: last.type === "TODO" ? 1 : 2,
    id: last.id,
  };
};