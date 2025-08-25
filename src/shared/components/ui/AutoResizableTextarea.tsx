import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Textarea } from "./textarea";

type ResizeMode = "none" | "vertical" | "horizontal" | "both";

export interface ResizableTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;     // 편의용
  autoGrow?: boolean;                           // 입력에 따라 자동 높이 조절
  minRows?: number;                             // 최소 줄 수
  maxRows?: number;                             // 최대 줄 수
  minHeight?: number;                           // px
  maxHeight?: number;                           // px
  resize?: ResizeMode;                          // CSS resize
  onResize?: (height: number) => void;          // 드래그 리사이즈 콜백
}

const AutoResizableTextarea = forwardRef<HTMLTextAreaElement, ResizableTextareaProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onValueChange,
      autoGrow = true,
      minRows = 1,
      maxRows,
      minHeight,
      maxHeight,
      resize = "vertical",
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

    // 라인 높이 계산
    const getLineHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el) return 20;
      const cs = window.getComputedStyle(el);
      const lh = cs.lineHeight;
      if (lh === "normal") {
        const fs = parseFloat(cs.fontSize || "16");
        return Math.round(fs * 1.2);
      }
      return parseFloat(lh);
    }, []);

    // border + padding 보정값
    const getNonContentHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el) return 0;
      return el.offsetHeight - el.clientHeight;
    }, []);

    const clamp = useCallback((n: number, lo?: number, hi?: number) => {
      let x = n;
      if (typeof lo === "number") x = Math.max(x, lo);
      if (typeof hi === "number") x = Math.min(x, hi);
      return x;
    }, []);

    const adjustHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoGrow) return;
      const prev = el.style.height;

      // content 기준 높이
      el.style.height = "auto";
      const contentH = el.scrollHeight;

      // rows 제한을 px로 환산
      const lineH = getLineHeight();
      const chromeFix = getNonContentHeight(); // border + padding
      const rowsMinPx = minRows ? minRows * lineH + chromeFix : undefined;
      const rowsMaxPx = maxRows ? maxRows * lineH + chromeFix : undefined;

      // 명시적 min/maxHeight 우선적용, 없으면 rows 기반
      const minPx = typeof minHeight === "number" ? minHeight : rowsMinPx;
      const maxPx = typeof maxHeight === "number" ? maxHeight : rowsMaxPx;

      const next = clamp(contentH, minPx, maxPx);
      el.style.height = `${next}px`;

      if (prev !== el.style.height) {
        // 사용자 드래그 리사이즈 아님: 자동 조절 콜백은 생략
      }
    }, [autoGrow, getLineHeight, getNonContentHeight, minRows, maxRows, minHeight, maxHeight, clamp]);

    // 값/폭 변경 시 재측정
    useLayoutEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    // 폭 변하면 scrollHeight 달라지므로 다시 계산
    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      const ro = new ResizeObserver(() => adjustHeight());
      ro.observe(el);
      return () => ro.disconnect();
    }, [adjustHeight]);

    // 드래그 리사이즈 감지
    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      if (resize === "none") return;
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        const blockSize =
          (entry.borderBoxSize?.[0]?.blockSize ??
            (entry as ResizeObserverEntry).contentRect?.height ??
            el.offsetHeight) || 0;
        // 사용자가 모서리를 드래그한 경우만 호출될 수 있음
        // autoGrow로 인한 변경도 들어올 수 있으나, 구분은 복잡하므로 단순 통지
        rest.onResize?.(blockSize);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [resize, rest]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        onValueChange?.(e.target.value);
        if (autoGrow) adjustHeight();
      },
      [onChange, onValueChange, autoGrow, adjustHeight]
    );

    const resizeStyle = useMemo<React.CSSProperties>(() => {
      const map: Record<ResizeMode, React.CSSProperties["resize"]> = {
        none: "none",
        vertical: "vertical",
        horizontal: "horizontal",
        both: "both",
      };
      return { resize: map[resize] };
    }, [resize]);

    return (
      <Textarea
        ref={innerRef}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        rows={minRows} // 초기 렌더 대비
        style={{ ...resizeStyle, overflow: "hidden", ...style }}
        className={className}
        {...rest}
      />
    );
  }
);

export default AutoResizableTextarea;
