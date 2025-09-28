import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useCompletedTodoHistoryInfiniteQuery } from "../model/completedHistoryApiHooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetCategoryListQuery } from "@/features/category/model/categoryApiHooks";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard.tsx";
import type { TodoCompletedHistory } from "@/entities/todo";
import CompletedDayGroup from "./CompletedDayGroup";

function CompletedHistoryInfiniteListCard() {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    refetch 
  } = useCompletedTodoHistoryInfiniteQuery(10);

  const { 
    data: categoryData 
  } = useGetCategoryListQuery({
    page: 0,
    size: 100,
    sort: "id,sortOrder"
  });

  const items = useMemo(() => data?.items ?? [], [data]);

  const scrollAreaWrapperRef = useRef<HTMLDivElement | null>(null);
  const [viewportEl, setViewportEl] = useState<HTMLElement | null>(null);
  const [noOverflow, setNoOverflow] = useState(false);

  useEffect(() => {
    if (!scrollAreaWrapperRef.current) return;
    const vp = scrollAreaWrapperRef.current.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]");
    if (vp) setViewportEl(vp);
  }, []);

  // 콘텐츠가 뷰포트 높이를 넘는지(=스크롤 필요 여부) 체크
  useEffect(() => {
    if (!viewportEl) return;
    const check = () => setNoOverflow(vp.scrollHeight <= vp.clientHeight);
    const vp = viewportEl;
    check();
    const ro = new ResizeObserver(check);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [viewportEl, items.length]);

  const { ref: sentinelRef, inView } = useInView({
    root: viewportEl ?? undefined,
    skip: !viewportEl,
    threshold: 1,
    rootMargin: "0px",
    initialInView: false,
  });

  // const findCategoryById = (id: number): CategoryType | undefined => {
  //   const category = categoryData?.content.find(cat => cat.id === id);
  //   if (category) return category;
  // }

  useEffect(() => {
    // 스크롤이 실제로 생긴 경우에만 자동 로드
    if (!noOverflow && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [noOverflow, inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 날짜별로 그룹핑
  const todoRecordsByDate: Record<string, TodoCompletedHistory[]> = {};
  items.forEach((item) => {
    if (!todoRecordsByDate[item.completedDate]) {
      todoRecordsByDate[item.completedDate] = [];
    }
    todoRecordsByDate[item.completedDate].push(item);
  });

  return (
    <Card className="p-2 gap-1 sm:w-full min-w-[350px] max-h-[calc(100vh-85px)]">
      <CardHeader className="p-2 w-full">
        <CardTitle>완료한 일</CardTitle>
        <CardDescription>완료한 일 기록을 확인할 수 있습니다.</CardDescription>
      </CardHeader>

      <CardContent className="p-0 pb-2 flex-1 min-h-0 flex flex-col">
        <div ref={scrollAreaWrapperRef} className="flex-1 h-full mt-2">
          <ScrollArea className="h-full">
            <ul className="px-2 pb-4 space-y-2">
              {isError && (
                <li className="text-sm text-destructive">
                  오류가 발생했습니다.{" "}
                  <button className="underline" onClick={() => refetch()}>다시 시도</button>
                </li>
              )}

              {
                todoRecordsByDate && Object.keys(todoRecordsByDate).map(date => {
                  const todos = todoRecordsByDate[date];
                  return (
                    <CompletedDayGroup 
                      key={date}
                      date={date} 
                      todos={todos} 
                      categories={categoryData?.content ?? []}
                    />
                  )
                })
              }

              {/* 센티넬: 스크롤이 생긴 경우에만 자동으로 다음 페이지 트리거 */}
              {hasNextPage && !noOverflow && (
                <li ref={sentinelRef} className="py-3 text-center text-xs text-muted-foreground">
                  {isFetchingNextPage ? "불러오는 중…" : "아래로 스크롤하면 더 불러옵니다"}
                </li>
              )}

              {/* 스크롤이 없으면 수동 '더 불러오기' 버튼 표시(연속 자동 로드 방지) */}
              {hasNextPage && noOverflow && (
                <li className="py-3 text-center">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="text-xs underline text-muted-foreground"
                  >
                    {isFetchingNextPage ? "불러오는 중…" : "더 불러오기"}
                  </button>
                </li>
              )}

              {!hasNextPage && items.length > 0 && (
                <li className="py-3 text-center text-xs text-muted-foreground">더 이상 불러올 항목이 없습니다.</li>
              )}

              {!isLoading && !items.length && (
                  <EmptyMessageCard message={"완요한 일이 없습니다."} />
              )}
            </ul>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

export default CompletedHistoryInfiniteListCard;
