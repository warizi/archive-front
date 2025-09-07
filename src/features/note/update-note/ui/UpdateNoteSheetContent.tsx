import { noteSchema, type NoteType, type NoteWithIdPresent } from "@/entities/note";
import Tiptap from "@/shared/components/ui/editor/Tiptap";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { SheetContent } from "@/shared/components/ui/sheet";
import Vertical from "@/shared/components/ui/Vertical";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateNote } from "../model/updateNoteApiHooks";
import axios from "axios";
import { toast } from "sonner";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useEffect, useRef } from "react";

interface UpdateNoteSheetContentProps {
  note: NoteWithIdPresent
}

function UpdateNoteSheetContent({ note }: UpdateNoteSheetContentProps) {
  const form = useForm<NoteType>({
    resolver: zodResolver(noteSchema),
    defaultValues: noteSchema.parse(note),
    mode: "onChange",
  }); 

  const { mutate } = useUpdateNote();

  const lastSavedRef = useRef<string>(JSON.stringify(noteSchema.parse(note)));
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const subscription = form.watch(() => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const values = form.getValues();
        if (!values.id) return;

        // 서버에 보낼 페이로드를 스키마로 보정
        const payload = noteSchema.parse(values);
        const snap = JSON.stringify(payload);

        // 내용 동일하면 요청 생략
        if (snap === lastSavedRef.current) return;

        mutate({ id: values.id, data: payload }, {
          onSuccess: () => {
            lastSavedRef.current = snap;
            // 더티 플래그 초기화 (값 유지)
            form.reset(values, { keepValues: true, keepDirty: false });
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              const message = error.response?.data?.message;
              toast.error(message || "자동 저장 실패");
            } else {
              toast.error("자동 저장 실패");
            }
          }
        });
      }, 300) as unknown as number;
    });

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [form, mutate])
  return (
    <SheetContent className="sm:max-w-[800px] h-dvh p-0 flex flex-col overflow-y-hidden">
      <Vertical className="flex-1 min-h-0 p-6 pt-12 pb-0 pr-4">
        <Form {...form}>
          <form id="update-note-form" className="flex h-full flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="sticky top-0">
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="제목을 입력하세요." 
                      {...field}           
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="contentJson"
              render={({ field }) => (
                <FormItem className="flex-1 min-h-0">
                  <ScrollArea className="h-full min-h-0 overflow-y-auto">
                    <Tiptap 
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </ScrollArea>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Vertical>
    </SheetContent>
  );
};

export default UpdateNoteSheetContent;