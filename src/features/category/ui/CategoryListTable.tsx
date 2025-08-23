import { CategoryTag, type CategoryType } from "@/entities/catogory";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { useDeleteCategoryMutation, useGetCategoryListQuery, useUpdateCategoryOrdersMutation } from "../model/categoryApiHooks";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { AppPagination } from "@/shared/components/ui/AppPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/components/ui/alert-dialog";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SortableDndContext from "@/shared/components/ui/SorableDndContext";
import type { CategoryWithIdPresent } from "@/entities/catogory/model/Category";
import DraggableWrapper from "@/shared/components/ui/DraggableWrapper";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";

interface CategoryListTableProps {
  selectedCategory: CategoryType | null
  setSelectCategory: (data: CategoryType | null) => void
}

const sortType = "desc";

function CategoryListTable({
  selectedCategory,
  setSelectCategory
}: CategoryListTableProps) {
  const [page, setPage] = useState(0);
  const size = 30;
  const { data, refetch } = useGetCategoryListQuery({
    page,
    size,
    sort: `sortOrder,${sortType}`
  });

  const { mutate } = useDeleteCategoryMutation();
  const { mutate: newOrdersMutate } = useUpdateCategoryOrdersMutation();

  const handleDelete = (id?: number | null) => {
    if (!id) {
      toast.error("삭제할 카테고리가 없습니다.");
      return;
    }
    if (selectedCategory?.id === id) {
      // 선택된 요소 삭제 시 초기화
      setSelectCategory(null);
    }
    mutate(id, {
      onSuccess: () => {
        toast.success("카테고리가 삭제되었습니다.")
      },
      onError: (error) => {
        if(axios.isAxiosError(error)) {
          const message = error?.response?.data?.message || "카테고리 삭제에 실패했습니다."
          toast.error(message)
        }
      }
    })
  }

  const handleSelect = (category: CategoryType) => {

    if (selectedCategory?.id === category.id) {
      return setSelectCategory(null);
    }
    return setSelectCategory(category);
  }

  const handleNewOrders = (newCategories: CategoryWithIdPresent[]) => {
    const newOrders: Map<number, number> = new Map();

    if (sortType === "desc") {
      newCategories.reverse().forEach((category, index) => {
        newOrders.set(category.id, index);
      });
    } else {
      newCategories.forEach((category, index) => {
        newOrders.set(category.id, index);
      });
    }

    newOrdersMutate(newOrders, {
      onSuccess: () => {
        toast.success("카테고리 순서가 변경되었습니다.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error?.response?.data?.message || "카테고리 순서 변경에 실패했습니다.";
          toast.error(message);
        }
      }
    });

  }

  useEffect(() => {
    refetch()
  }, [page,refetch])

  return (
      <ScrollArea className="h-[315px] w-full">
        <SortableDndContext
          handleDragEnd={handleNewOrders}
          data={data?.content || []}
        >
          {(item) => {
            return (
              <Table>
                <TableBody>
                  {
                    item.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center">
                          <EmptyMessageCard className="p-5" message="카테고리가 없습니다. 카테고리를 추가해보세요." />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <AlertDialog>
                        {item?.map((category: CategoryWithIdPresent) => (
                          <>
                            <DraggableWrapper
                              key={category.id}
                              id={category.id}
                              asChild
                              >
                              <TableRow 
                                key={category.id} 
                                selected={selectedCategory?.id === category.id} 
                                className="cursor-pointer group"
                              >
                                <TableCell width={50}>
                                  <CategoryTag category={category}/>
                                </TableCell>
                                <TableCell
                                  onClick={() => handleSelect(category)} 
                                >
                                  {category.name}
                                </TableCell>
                                <TableCell width={20}>
                                    <AlertDialogTrigger asChild>
                                      <Button variant={"ghost"} size={"xs"} aria-label="삭제"             
                                        className="
                                        opacity-0 pointer-events-none
                                        group-hover:opacity-100 group-hover:pointer-events-auto
                                        group-data-[state=selected]:opacity-100 group-data-[state=selected]:pointer-events-auto
                                        focus:opacity-100 focus:pointer-events-auto
                                        transition-opacity"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        <Trash2
                                          className="
                                            h-4 w-4 transition-colors
                                            text-zinc-400 dark:text-zinc-500
                                            group-hover:text-red-600 dark:group-hover:text-red-400
                                            active:text-red-700 dark:active:text-red-300
                                          "
                                          strokeWidth={1.3}
                                        />
                                      </Button>
                                    </AlertDialogTrigger>
                                </TableCell>
                              </TableRow>
                            </DraggableWrapper>

                            {/* 삭제 dialog */}
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  선택한 카테고리를 삭제하시겠습니까?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  연결된 모든 요소의 해당 카테고리가 삭제됩니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  취소
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category?.id)}
                                >
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </>
                        ))}
                      </AlertDialog>
                    )
                  }
                </TableBody>
              </Table>
            )
          }}
        </SortableDndContext>
        <AppPagination 
          page={page}
          totalPages={data?.totalPages ?? 0}
          onPageChange={setPage}
        />
      </ScrollArea>
  );
};

export default CategoryListTable;