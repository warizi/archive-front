import { useQuery } from "@tanstack/react-query";
import { getNoteListInFolder } from "../api/listNoteApi";
import { NOTE_QUERY_KEY } from "@/entities/note";

export const useGetNoteListInFolder = (folderId: number) => useQuery({
  queryFn: () => getNoteListInFolder(folderId),
  queryKey: [NOTE_QUERY_KEY.list, folderId],
})