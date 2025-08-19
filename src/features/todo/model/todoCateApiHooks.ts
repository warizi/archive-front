import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoCateDeleteApi, todoCateGetAllApi, todoCateSaveApi } from "../api/todoCategoryApi";

export const todoCateKey = {
  all: ["todoCategories"] as const,
  details: (id: string) => [...todoCateKey.all, id] as const
};

export const useTodoCateGetAllQuery = () => useQuery({
  queryKey: todoCateKey.all,
  queryFn: todoCateGetAllApi
});

export const useTodoCateSaveMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: todoCateSaveApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoCateKey.all });
    }
  });
};

export const useTodoCateDeleteMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: todoCateDeleteApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoCateKey.all });
    }
  });
};