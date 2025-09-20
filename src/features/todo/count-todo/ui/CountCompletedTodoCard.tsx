import CountCard from "@/shared/components/ui/custom/CountCard";
import { ROUTES_URL } from "@/shared/constants";
import { Check } from "lucide-react";
import { useGetCompletedTodoCount } from "../model/countTodoApiHooks";

function CountCompletedTodoCard() {
  const { data } = useGetCompletedTodoCount();
  return (
    <CountCard
      title="완료된 할 일"
      count={data?.data ?? 0}
      unit="개"
      icon={<Check size={20} />}
      className="hover:scale-[1.02] transition-transform"
      link={ROUTES_URL.TODO_COMPLETE}
    >
      <span className="text-sm text-muted-foreground">
        지금까지 완료한 할 일의 개수
      </span>
    </CountCard>
  );
};

export default CountCompletedTodoCard;