import CountCard from "@/shared/components/ui/custom/CountCard";
import { ROUTES_URL } from "@/shared/constants";
import { NotepadText } from "lucide-react";
import { useGetCountNote } from "../model/countNoteApiHooks";

function CountNoteCard() {
  const { data } = useGetCountNote();
  return (
    <CountCard
      title="작성된 노트"
      count={data?.data ?? 0}
      unit="개"
      icon={<NotepadText size={20} />}
      className="hover:scale-[1.02] transition-transform"
      link={ROUTES_URL.NOTE}
    >
      <span className="text-sm text-muted-foreground">
        지금까지 작성된 노트의 개수
      </span>
    </CountCard>
  );
};

export default CountNoteCard;