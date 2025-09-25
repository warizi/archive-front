import { useQuery } from "@tanstack/react-query";
import { getNoteListInFolder, getRecentNoteList } from "../api/listNoteApi";
import { NOTE_QUERY_KEY } from "@/entities/note";

export const useGetNoteListInFolder = (folderId: number) => useQuery({
  queryFn: () => getNoteListInFolder(folderId),
  queryKey: [NOTE_QUERY_KEY.list, folderId],
});

export const useGetRecentNoteList = () => useQuery({
  queryFn: () => getRecentNoteList(),
  queryKey: [NOTE_QUERY_KEY.recent, NOTE_QUERY_KEY.list],
});