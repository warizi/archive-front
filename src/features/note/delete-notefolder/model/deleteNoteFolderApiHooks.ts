import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listNoteFolderKey } from "../../list-notefolder/model/listNoteFolderApiHooks";
import { deleteNoteFolderApi } from "../api/deleteNoteFolderApi";

export const useDeleteNoteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteFolderId: number) => deleteNoteFolderApi(noteFolderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listNoteFolderKey] });
    }
  })
}