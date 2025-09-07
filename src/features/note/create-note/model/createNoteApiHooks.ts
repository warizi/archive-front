import { NOTE_QUERY_KEY, type NoteCreateType } from "@/entities/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/createNoteApi";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteCreateType) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY.list] });
    }
  })
}

export const useCreateNoteInFolder = (noteFolderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteCreateType) => createNote({ ...data, folderId: noteFolderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY.list, noteFolderId] });
    }
  })
}