import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNoteFolder } from "../api/createNoteFolderApi";
import { listNoteFolderKey } from "../../list-notefolder/model/listNoteFolderApiHooks";

export const useCreateNoteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; parentId?: number | null }) => createNoteFolder(data.name, data.parentId === null ? null : String(data.parentId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listNoteFolderKey] });
    }
  })
}