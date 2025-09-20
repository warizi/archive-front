import CountCard from "@/shared/components/ui/custom/CountCard";
import { ROUTES_URL } from "@/shared/constants";
import { Repeat2 } from "lucide-react";
import { useGetRepeatTodoCount } from "../model/countTodoApiHooks";

function CountRepeatTodoCard() {
  const { data } = useGetRepeatTodoCount();
  return (
    <CountCard
      title="반복 할 일"
      count={data?.data ?? 0}
      unit="개"
      icon={<Repeat2 size={20} />}
      className="hover:scale-[1.02] transition-transform"
      link={ROUTES_URL.TODO_REPEAT}
    >
      <span className="text-sm text-muted-foreground">
        등록된 반복 할 일의 개수
      </span>
    </CountCard>
  );
};

export default CountRepeatTodoCard;