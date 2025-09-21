import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from "@/shared/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartData = [
  {
    category: "공부",
    unCompletedTodo: 5,
    fill: "#8884d8",
  },
  {
    category: "운동",
    unCompletedTodo: 3,
    fill: "#82ca9d",  
  },
  {
    category: "취미",
    unCompletedTodo: 8,
    fill: "#ffc658",
  },
  {
    category: "기타",
    unCompletedTodo: 2,
    fill: "#d0ed57",
  },
  {
    category: "일",
    unCompletedTodo: 6,
    fill: "#a4de6c",
  },
  {
    category: "취미",
    unCompletedTodo: 8,
    fill: "#ffc658",
  },
  {
    category: "기타",
    unCompletedTodo: 2,
    fill: "#d0ed57",
  },
  {
    category: "일",
    unCompletedTodo: 6,
    fill: "#a4de6c",
  }
];

const chartConfig = {
  "공부": {
    label: "공부",
    color: "var(--chart-1)",
  },
  "운동": {
    label: "운동",
    color: "var(--chart-2)",
  },
  "취미": {
    label: "취미",
    color: "var(--chart-3)",
  },
  "기타": {
    label: "기타",
    color: "var(--chart-4)",
  },
  "일": {
    label: "일",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function CategoryTodoChartPieCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          카테고리별 할 일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={chartConfig} 
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie 
              data={chartData}
              dataKey={"unCompletedTodo"}
            />
            <ChartLegend 
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryTodoChartPieCard;