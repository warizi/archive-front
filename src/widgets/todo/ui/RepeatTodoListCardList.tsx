import { TODO_REPEAT_FREQUENCY } from "@/entities/todo";
import RepeatTodoListCard from "./RepeatTodoListCard";

function RepeatTodoListCardList() {
  return (
    <>
      {
        Object.values(TODO_REPEAT_FREQUENCY).map((frequency) => (
          <RepeatTodoListCard key={frequency} repeatFrequency={frequency as keyof typeof TODO_REPEAT_FREQUENCY} />
        ))
      }
    </>
  );
};

export default RepeatTodoListCardList;