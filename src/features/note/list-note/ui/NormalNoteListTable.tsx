import type { NoteWithIdPresent } from "@/entities/note";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Book } from "lucide-react";
import { DeleteNoteIconButton } from "../../delete-note";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { UpdateNoteSheetContent } from "../../update-note";

interface NormalNoteListTableProps {
  data?: NoteWithIdPresent[];
}

function NormalNoteListTable({ data }: NormalNoteListTableProps) {
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
          data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                <EmptyMessageCard message="노트가 없습니다. 노트를 추가해보세요." />
              </TableCell>
            </TableRow>
          )
        }
        {
          data?.map(item => (
            <Sheet key={item.id}>
              <SheetTrigger asChild>
                <TableRow className="group">
                  <TableCell className="text-center flex flex-row justify-center">
                    <Book size={18} />
                  </TableCell>
                  <TableCell className="truncate cursor-pointer">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-right">
                    <Horizontal justify="center" align="center" className="gap-3 h-full">
                      <DeleteNoteIconButton noteId={item.id} />
                    </Horizontal>
                  </TableCell>
                </TableRow>
              </SheetTrigger>
              <UpdateNoteSheetContent note={item} />
            </Sheet>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default NormalNoteListTable;