import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useGetCompletedTodoWeekChart } from "../model/chartTodoApiHooks";
import { useState } from "react";
import Horizontal from "@/shared/components/ui/Horizontal";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const chartConfig = {
  value: {
    label: "완료된 할 일",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function CompletedTodoChartBarCard() {
  const [ weeksBack, setWeeksBack ] = useState(0);
  const { data } = useGetCompletedTodoWeekChart(weeksBack);
  const chartData = data?.data.chartData ?? [];

  const handlePrevWeeksBackChange = () => {
    setWeeksBack((prev) => prev + 1);
  };
  const handleNextWeeksBackChange = () => {
    setWeeksBack((prev) => Math.max(prev - 1, 0));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          주간 완료된 할 일
        </CardTitle>
        <CardAction>
          <Horizontal align="center" justify="end" className="gap-2">
            <Button size={"icon"} onClick={handlePrevWeeksBackChange} className="size-6">
              <ChevronLeft />
            </Button>
            <Button size={"icon"} onClick={handleNextWeeksBackChange} className="size-6" disabled={weeksBack === 0}>
              <ChevronRight />
            </Button>
          </Horizontal>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={chartConfig}
          className="h-[140px] w-full"
        >
          <BarChart 
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid 
              vertical={false} 
            />
            <XAxis
              dataKey="weekDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              type="natural"
              name="완료된 할 일"
              fill="var(--chart-3)"
              radius={8}
            >
              <LabelList 
                position={"top"}
                offset={12}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompletedTodoChartBarCard;