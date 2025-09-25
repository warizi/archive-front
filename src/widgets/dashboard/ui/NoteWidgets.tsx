import { NormalNoteListTable } from "@/features/note/list-note";
import { useGetRecentNoteList } from "@/features/note/list-note/model/useGetNoteListInFolder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Vertical from "@/shared/components/ui/Vertical";

function NoteWidgets() {
  const { data: recentNoteList } = useGetRecentNoteList();

  return (
    <Vertical className="w-full gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            최근 노트
          </CardTitle>
          <CardDescription>
            최근에 수정된 노트 목록입니다. (최대 10개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NormalNoteListTable 
            data={recentNoteList?.data || []}  
          />
        </CardContent>
      </Card>
    </Vertical>
  );
};

export default NoteWidgets;