import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote, updateNoteMoveInFolder } from "../api/updateNoteApi";
import { NOTE_QUERY_KEY, type NoteType, type NoteWithIdPresent } from "@/entities/note";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data}: { id: number; data: NoteType }) => updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY.list] });
    }
  })
}

export const useMoveNoteInFolder = (folderId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noteList: NoteWithIdPresent[]) => updateNoteMoveInFolder(folderId, noteList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTE_QUERY_KEY.list, folderId] });
    }
  })
}