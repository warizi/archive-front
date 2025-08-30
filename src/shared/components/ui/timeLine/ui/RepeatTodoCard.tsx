import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { ScrollArea } from "../../scroll-area";

function RepeatTodoCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          반복 할 일
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="h-[500px]">
            할일
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RepeatTodoCard;