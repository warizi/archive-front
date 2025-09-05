import { noteFolderSchema, type NoteFolderType, type NoteFolderWithIdPresent } from "@/entities/note";
import { Button } from "@/shared/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateNoteFolder } from "../model/updateNoteFolderApiHooks";
import { toast } from "sonner";
import axios from "axios";

interface UpdateNoteFolderDialogContentProps {
  noteFolder: NoteFolderWithIdPresent;
}
function UpdateNoteFolderDialogContent({ noteFolder }: UpdateNoteFolderDialogContentProps) {
  const form = useForm<NoteFolderType>({
    resolver: zodResolver(noteFolderSchema),
    defaultValues: noteFolder
  })
  const { name } = noteFolder;

  const { mutate } = useUpdateNoteFolder();

  const onSubmit = (data: NoteFolderType) => {
    
    mutate({ id: noteFolder.id, name: data.name }, {
      onSuccess: () => {
        toast.success("폴더 이름이 변경되었습니다.");
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          toast.error(message ?? "폴더 이름 변경에 실패했습니다.");
        }
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>폴더 이름 변경</DialogTitle>
        <DialogDescription>
          {name} 폴더 이름을 변경합니다. 2자 이상 100자 이하로 입력해주세요.
        </DialogDescription>
      </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="update-note-folder-form">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field} 
                      autoFocus 
                      placeholder="폴더 이름"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>취소</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" form="update-note-folder-form">확인</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default UpdateNoteFolderDialogContent;