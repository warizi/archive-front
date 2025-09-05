import { useQuery } from "@tanstack/react-query";
import { getNoteFolderAll } from "../api/listNoteFolderApi";

export const listNoteFolderKey = "listNoteFolder";

export const useGetAllNoteFolder = () => useQuery({
  queryKey: [listNoteFolderKey],
  queryFn: () => getNoteFolderAll()
})