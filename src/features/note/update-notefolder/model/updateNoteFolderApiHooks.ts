import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteFolder, updateNoteFolderMove } from "../api/updateNoteFolderApi";
import { listNoteFolderKey } from "../../list-notefolder/model/listNoteFolderApiHooks";
import type { NoteFolderWithIdPresent } from "@/entities/note";

export const useUpdateNoteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; name: string }) => updateNoteFolder(data.id, data.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listNoteFolderKey] });
    }
  })
}

export const useMoveNoteFolder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noteFolderList: NoteFolderWithIdPresent[]) => updateNoteFolderMove(noteFolderList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listNoteFolderKey] });
    }
  })
}