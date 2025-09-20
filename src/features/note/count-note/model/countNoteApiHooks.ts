import { useQuery } from "@tanstack/react-query";
import { getCountNote } from "../api/countNoteApi";
import { NOTE_QUERY_KEY } from "@/entities/note";

export const useGetCountNote = () => useQuery({
  queryFn: getCountNote,
  queryKey: [NOTE_QUERY_KEY.list, NOTE_QUERY_KEY.count],
})