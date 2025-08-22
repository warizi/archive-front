// shared/components/ui/Pager.tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { cn } from "@/shared/lib/utils";
import { useCallback, useEffect } from "react";

type PageToken = number | "ellipsis";

export interface PagerProps {
  /** 0-based 현재 페이지 */
  page: number;
  /** 전체 페이지 수 (없으면 0 취급) */
  totalPages: number;
  /** 페이지 변경 콜백(0-based) */
  onPageChange?: (page: number) => void;
  /** 링크 모드: href를 생성(0-based 입력)하면 a 링크로 렌더링 */
  hrefBuilder?: (page: number) => string;
  /** 주변 페이지 개수 (기본 1) */
  siblingCount?: number;
  /** 양끝 고정 페이지 개수 (기본 1) */
  boundaryCount?: number;
  className?: string;
  /** 비활성화 전체 */
  disabled?: boolean;
}

function getRange(
  page0: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1
): PageToken[] {
  if (totalPages <= 0) return [];
  const current = page0 + 1; // 1-based
  const startPages = Array.from({ length: Math.min(boundaryCount, totalPages) }, (_, i) => i + 1);
  const endPages = Array.from(
    { length: Math.min(boundaryCount, totalPages) },
    (_, i) => totalPages - Math.min(boundaryCount, totalPages) + i + 1
  );

  const siblingsStart = Math.max(
    Math.min(
      current - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      current + siblingCount,
      boundaryCount + siblingCount * 2 + 2
    ),
    endPages.length ? endPages[0] - 2 : totalPages - 1
  );

  const items: PageToken[] = [];

  // start
  items.push(...startPages);

  // start ellipsis
  if (siblingsStart > boundaryCount + 2) items.push("ellipsis");
  else if (boundaryCount + 1 < totalPages - boundaryCount) items.push(boundaryCount + 1);

  // middle
  for (let p = siblingsStart; p <= siblingsEnd; p++) items.push(p);

  // end ellipsis
  if (siblingsEnd < totalPages - boundaryCount - 1) items.push("ellipsis");
  else if (totalPages - boundaryCount > boundaryCount) items.push(totalPages - boundaryCount);

  // end
  items.push(...endPages.filter((p) => !items.includes(p)));

  // dedupe & sort by natural order of push (already ordered)
  return items;
}
// shared/components/ui/Pager.tsx
export function AppPagination({
  page,
  totalPages,
  onPageChange,
  hrefBuilder,
  siblingCount = 1,
  boundaryCount = 1,
  className,
  disabled,
}: PagerProps) {
  // 1) 안전한 totalPages
  const safeTotal = Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0;

  // 2) 페이지 보정 함수
  const clampPage = useCallback(
    (p: number) => Math.min(Math.max(Number.isFinite(p) ? Math.floor(p) : 0, 0), safeTotal - 1),
    [safeTotal]
  );

  // 3) 렌더링용 보정 페이지
  const effectivePage = clampPage(page);

  // 4) 부모 상태 교정 (필요할 때만 1회 호출)
  useEffect(() => {
    if (!onPageChange) return;
    if (page !== effectivePage) onPageChange(effectivePage);
  }, [page, effectivePage, onPageChange]);

  const items = getRange(effectivePage, safeTotal, siblingCount, boundaryCount);
  const prevDisabled = disabled || effectivePage <= 0;
  const nextDisabled = disabled || effectivePage >= safeTotal - 1;

  const handleNav = (target0: number) => (e: React.MouseEvent) => {
    if (disabled) return;
    if (!hrefBuilder) e.preventDefault();
    onPageChange?.(clampPage(target0));
  };

  const hrefOf = (p0: number) => (hrefBuilder ? hrefBuilder(clampPage(p0)) : "#");

  if (safeTotal <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hrefOf(effectivePage - 1)}
            aria-disabled={prevDisabled}
            tabIndex={prevDisabled ? -1 : 0}
            className={cn(prevDisabled && "pointer-events-none opacity-50")}
            onClick={prevDisabled ? undefined : handleNav(effectivePage - 1)}
          />
        </PaginationItem>

        {items.map((token, idx) =>
          token === "ellipsis" ? (
            <PaginationItem key={`e-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={token}>
              <PaginationLink
                href={hrefOf(token - 1)}
                isActive={token - 1 === effectivePage}
                aria-current={token - 1 === effectivePage ? "page" : undefined}
                onClick={
                  token - 1 === effectivePage
                    ? (e) => !hrefBuilder && e.preventDefault()
                    : handleNav(token - 1)
                }
              >
                {token}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={hrefOf(effectivePage + 1)}
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : 0}
            className={cn(nextDisabled && "pointer-events-none opacity-50")}
            onClick={nextDisabled ? undefined : handleNav(effectivePage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
