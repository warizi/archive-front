import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategoryApi, deleteCategoryApi, getCategoryApi, getCategoryListApi, updateCategoryApi, updateCategoryOrdersApi } from "../api/categoryApi"
import type { PageRequest } from "@/shared/type/request"
import type { CategoryCreateType, CategoryType } from "@/entities/catogory/model/Category";
import { TODO_QUERY_KEY } from "@/entities/todo";

export const categoryKey = {
  list: () => [`category`, `list`] as const,
  detail: (id: number) => [`category`, `detail`, id] as const,
}

export const useGetCategoryListQuery = (page: PageRequest) => useQuery({
  queryKey: categoryKey.list(),
  queryFn: () => getCategoryListApi(page)
});

export const useGetCategoryDetailQuery = (id: number) => useQuery({
  queryKey: categoryKey.detail(id),
  queryFn: () => getCategoryApi(id)
});

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateType) => createCategoryApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.list() });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryType) => {
      if (data.id == null) {
        throw new Error("Category id must not be null");
      }
      return updateCategoryApi(data.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.list() });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.list() });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.LIST });
    }
  });
};

export const useUpdateCategoryOrdersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orders: Map<number, number>) => updateCategoryOrdersApi(orders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.list() });
    }
  });
};