import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/deleteNoteApi";
import { NOTE_QUERY_KEY } from "@/entities/note";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY.list] });
    }
  })
}