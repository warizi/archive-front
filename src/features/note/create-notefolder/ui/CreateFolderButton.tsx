import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { FolderPlus } from "lucide-react";
import { useCreateNoteFolder } from "../model/createNoteFolderApiHooks";
import { toast } from "sonner";
import axios from "axios";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useForm } from "react-hook-form";
import { noteFolderSchema, type NoteFolderCreateType } from "@/entities/note";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

function CreateFolderButton() {
  const { mutate, isPending } = useCreateNoteFolder();
  const form = useForm<NoteFolderCreateType>({
    resolver: zodResolver(noteFolderSchema),
  })

  const handleCreateFolder = (data: NoteFolderCreateType) => {
    mutate({ name: data.name, parentId: data.parentId ?? null }, {
      onSuccess: () => {
        toast.success("새 폴더가 생성되었습니다.");
        form.reset();
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "폴더 생성에 실패했습니다.");
        }
      }
    });
  };

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon"} disabled={isPending}>
              <FolderPlus />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>새 폴더 추가</DialogTitle>
            <DialogDescription>
              2자 이상 100자 이하로 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateFolder)} id={`create-note-folder-form`}>
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
              <Button variant={"outline"} onClick={() => form.reset()}>취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                type="submit" 
                form={`create-note-folder-form`} 
                onClick={() => handleCreateFolder(form.getValues())}
              >
                확인
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        <TooltipContent>
          <p>새 폴더</p>
        </TooltipContent>
      </Tooltip>
    </Dialog>
  );
};

export default CreateFolderButton;