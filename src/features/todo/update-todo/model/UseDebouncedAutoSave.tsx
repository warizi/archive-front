import axios from "axios";
import { useEffect, useRef } from "react";
import { useWatch, type FieldValues, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type MutateFn<T> = (data: T, opts?: { onSuccess?: () => void; onError?: (e: unknown) => void }) => void;

export function useDebouncedAutosave<T>({
  form,
  mutate,
  delay = 300,
  validate = true,
  muteSuccess = true,
}: {
  form: UseFormReturn<T extends FieldValues ? T : never>;
  mutate: MutateFn<T>;
  delay?: number;          // ms
  validate?: boolean;      // 저장 전 form.trigger()
  muteSuccess?: boolean;   // 성공 토스트 숨김
}) {
  const watched = useWatch({ control: form.control });

  const firstRef = useRef(true);
  const skipNextRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 다음 autosave 1회 건너뛰기 (reset/프로그램적 변경 직후 호출) */
  const skipNext = () => { skipNextRef.current = true; };

  useEffect(() => {
    if (firstRef.current) { firstRef.current = false; return; }
    if (skipNextRef.current) { skipNextRef.current = false; return; }
    if (!form.formState.isDirty) return;
    
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (validate) {
        const ok = await form.trigger(undefined, { shouldFocus: false });
        if (!ok) return;
      }
      const data = form.getValues();
      const normalizeData = {
        ...data,
        importance: data.importance === "" ? undefined : data.importance,
      }
      mutate(normalizeData as T, {
        onSuccess: () => { if (!muteSuccess) toast.success("저장되었습니다."); },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || error.message;
            toast.error(msg);
          }
        }
      });
    }, delay);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watched, delay, validate, muteSuccess]);

  return { skipNext };
}