import { useEffect, useRef, useCallback, useState } from "react";
import { clampWithinRange } from "./helper";

type Opts = {
  edge?: number;
  maxSpeed?: number;
  vertical?: boolean;
  horizontal?: boolean;
  enabled?: boolean;
  itemHeight?: number;
};

export function useEdgeAutoScroll(
  scrollTargetRef: React.RefObject<HTMLElement | null>,
  {
    edge = 80,
    maxSpeed = 12,
    vertical = true,
    horizontal = false,
    enabled = true,
    itemHeight = 24,
  }: Opts = {}
) {
  // 몇번째 item에 hover 되었는지
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // 애니메이션 프레임 ID 저장
  const animationFrameIdRef = useRef<number | null>(null);
  // 포인터 위치 저장
  const pointerPositionRef = useRef({ clientX: 0, clientY: 0 });
  // 포인터가 마지막으로 내부에 있었는지 여부
  const lastPointerInsideRef = useRef(false);

  // 현재 활성화 상태
  const isEnabledRef = useRef(enabled);
  // 설정 값 저장
  const optionsRef = useRef({ edge, maxSpeed, vertical, horizontal, itemHeight });

  // 설정 값 업데이트
  useEffect(() => { isEnabledRef.current = enabled; }, [enabled]);
  // 애니메이션 프레임 ID 업데이트
  useEffect(() => {
    optionsRef.current = { edge, maxSpeed, vertical, horizontal, itemHeight };
  }, [edge, maxSpeed, vertical, horizontal, itemHeight]);

  // 애니메이션 중지
  const stopAnimation = useCallback(() => {
    if (animationFrameIdRef.current != null) cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = null;
  }, []);

  // hoverIndex 계산
  const computeHoverIndex = useCallback((el: HTMLElement, clientX: number, clientY: number): number | null => {
    const { itemHeight } = optionsRef.current;
    if (itemHeight <= 0) return null;

    const bounds = el.getBoundingClientRect();
    const inside = clientY >= bounds.top && clientY <= bounds.bottom && clientX >= bounds.left && clientX <= bounds.right;
    if (!inside) return null;

    const localY = clientY - bounds.top;
    const contentY = localY + el.scrollTop;
    const rawIndex = Math.floor(contentY / itemHeight);
    const maxIndex = Math.floor((el.scrollHeight - 1) / itemHeight);
    return clampWithinRange(rawIndex, 0, Math.max(0, maxIndex));
  }, []);

  // 스크롤 애니메이션 실행
  const runScrollFrame = useCallback(() => {
    animationFrameIdRef.current = null;

    const el = scrollTargetRef.current;
    if (!el || !isEnabledRef.current) return;

    const { edge: edgePx, maxSpeed: pxPerFrame, vertical: vOn, horizontal: hOn } = optionsRef.current;

    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = pointerPositionRef.current;

    const inside =
      clientX >= rect.left && clientX <= rect.right &&
      clientY >= rect.top  && clientY <= rect.bottom;

    lastPointerInsideRef.current = inside;

    // hoverIndex 갱신
    const nextHover = computeHoverIndex(el, clientX, clientY);
    setHoverIndex(prev => (prev === nextHover ? prev : nextHover));

    if (!inside) {
      stopAnimation(); // ★ 밖으로 나가면 즉시 중단
      return;
    }

    let deltaX = 0, deltaY = 0;

    if (vOn) {
      const toTop = clientY - rect.top;
      const toBottom = rect.bottom - clientY;
      if (toTop < edgePx)       deltaY = -((edgePx - toTop) / edgePx) * pxPerFrame;
      else if (toBottom < edgePx) deltaY =  ((edgePx - toBottom) / edgePx) * pxPerFrame;

      if (deltaY) {
        const maxTop = el.scrollHeight - el.clientHeight;
        el.scrollTop = clampWithinRange(el.scrollTop + deltaY, 0, Math.max(0, maxTop));
      }
    }

    if (hOn) {
      const toLeft = clientX - rect.left;
      const toRight = rect.right - clientX;
      if (toLeft < edgePx)       deltaX = -((edgePx - toLeft) / edgePx) * pxPerFrame;
      else if (toRight < edgePx) deltaX =  ((edgePx - toRight) / edgePx) * pxPerFrame;

      if (deltaX) {
        const maxLeft = el.scrollWidth - el.clientWidth;
        el.scrollLeft = clampWithinRange(el.scrollLeft + deltaX, 0, Math.max(0, maxLeft));
      }
    }

    if (deltaX || deltaY) {
      animationFrameIdRef.current = requestAnimationFrame(runScrollFrame);
    }
  }, [scrollTargetRef, computeHoverIndex, stopAnimation]);

  // 전역 포인터 좌표 추적 + (안에 있을 때만) 루프 기동
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointerPositionRef.current.clientX = e.clientX;
      pointerPositionRef.current.clientY = e.clientY;

      const el = scrollTargetRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom;

        lastPointerInsideRef.current = inside;

        // hoverIndex 즉시 갱신
        const nextHover = computeHoverIndex(el, e.clientX, e.clientY);
        setHoverIndex(prev => (prev === nextHover ? prev : nextHover));

        // ★ 컨테이너 안에 있을 때만 RAF 시작
        if (inside && isEnabledRef.current && animationFrameIdRef.current == null) {
          animationFrameIdRef.current = requestAnimationFrame(runScrollFrame);
        }
        // 밖이면 스크롤 중단
        if (!inside) stopAnimation();
      }
    };

    // 포인터가 멈췄을 때
    const onPointerStop = () => {
      setHoverIndex(null);
      stopAnimation();
    };

    // 이벤트 리스너 등록
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerStop, { passive: true });
    window.addEventListener("pointercancel", onPointerStop, { passive: true });
    window.addEventListener("blur", onPointerStop, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerStop);
      window.removeEventListener("pointercancel", onPointerStop);
      window.removeEventListener("blur", onPointerStop);
      stopAnimation();
    };
  }, [runScrollFrame, computeHoverIndex, stopAnimation, scrollTargetRef]);

  // enabled 토글: 바깥에서 켜져도 바로 시작하지 않음(안쪽에 들어오면 시작)
  useEffect(() => {
    if (!enabled) stopAnimation();
  }, [enabled, stopAnimation]);

  return hoverIndex; // 컨테이너 밖이면 null
}
