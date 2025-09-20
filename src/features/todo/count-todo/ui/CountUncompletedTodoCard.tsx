import CountCard from "@/shared/components/ui/custom/CountCard";
import { ROUTES_URL } from "@/shared/constants";
import { CircleAlert } from "lucide-react";
import { useGetUncompletedTodoCount } from "../model/countTodoApiHooks";

function CountUncompletedTodoCard() {
  const { data } = useGetUncompletedTodoCount();
  return (
    <CountCard
      title="미완료 할 일"
      count={data?.data ?? 0}
      unit="개"
      icon={<CircleAlert size={20} />}
      className="hover:scale-[1.02] transition-transform"
      link={ROUTES_URL.TODO}
    >
      <span className="text-sm text-muted-foreground">
        미완료 할 일의 개수 (반복 제외)
      </span>
    </CountCard>
  );
};

export default CountUncompletedTodoCard;