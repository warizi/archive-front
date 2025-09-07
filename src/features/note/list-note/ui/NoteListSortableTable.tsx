import type { NoteWithIdPresent } from "@/entities/note";
import { DraggableHandle } from "@/shared/components/ui/dnd/DraggableHandle";
import DraggableWrapper from "@/shared/components/ui/dnd/DraggableWrapper";
import SortableDndContext from "@/shared/components/ui/dnd/SorableDndContext";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Book, GripHorizontal } from "lucide-react";
import { UpdateNoteSheetContent } from "../../update-note";
import Horizontal from "@/shared/components/ui/Horizontal";
import { DeleteNoteIconButton } from "../../delete-note";
import Vertical from "@/shared/components/ui/Vertical";

interface NoteListSortableTableProps {
  data: NoteWithIdPresent[];
  handleDragEnd: (newData: NoteWithIdPresent[]) => void;
}

function NoteListSortableTable({ 
  data = [],
  handleDragEnd,
}: NoteListSortableTableProps) {

  return (
    <SortableDndContext data={data} handleDragEnd={handleDragEnd}>
      {(items) => {
        return (
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  종류
                </TableHead>
                <TableHead>
                  제목
                </TableHead>
                <TableHead className="w-20 text-center">
                  액션
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <Vertical className="h-[calc(100vh-300px)]" justify="center" align="center">
                        <EmptyMessageCard message="노트가 없습니다. 노트를 추가해보세요." />
                      </Vertical>
                    </TableCell>
                  </TableRow>
                )
              }
              {
                items.map(item => (
                  <Sheet key={item.id}>
                    <DraggableWrapper id={item.id} asChild>
                      <SheetTrigger asChild>
                        <TableRow className="group">
                          <TableCell className="text-center flex flex-row justify-center">
                            <Book size={18} />
                          </TableCell>
                          <TableCell className="truncate">
                            {item.title}
                          </TableCell>
                          <TableCell className="text-right">
                            <Horizontal justify="center" align="center" className="gap-3 h-full">
                              <DeleteNoteIconButton noteId={item.id} />
                              <DraggableHandle
                                itemId={item.id}
                              >
                                <GripHorizontal size={18} className="cursor-grab" />
                              </DraggableHandle>
                            </Horizontal>
                          </TableCell>
                        </TableRow>
                      </SheetTrigger>
                    </DraggableWrapper>
                    <UpdateNoteSheetContent note={item} />
                  </Sheet>
                ))
              }
            </TableBody>
          </Table>
        )
      }}
    </SortableDndContext>
  );
};

export default NoteListSortableTable;