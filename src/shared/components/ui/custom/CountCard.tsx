import { cn } from "@/shared/lib/utils";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card";
import Horizontal from "../Horizontal";
import CountUp from "react-countup";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CountCardProps {
  title: string;
  count: number;
  unit: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  link?: string;
}

function CountCard({ title, count, unit, icon, children, className, link }: CountCardProps) {
  const navigate = useNavigate();

  const action = () => {
    if (link) {
      navigate(link);
    }
  }
  return (
    <Card className={cn(`gap-1`, className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {link && (
          <CardAction>
            <Button size={"icon"} onClick={action} className="size-6">
              <ArrowRight />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <Horizontal justify="start" align="end" className="gap-2 sm:mb-4">
          <CountUp
            start={0}
            end={count}
            duration={1}
            separator=","
            className="text-2xl font-bold"
          />
          <span>{unit}</span>
        </Horizontal>
        <div className="w-fll hidden sm:block">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountCard;