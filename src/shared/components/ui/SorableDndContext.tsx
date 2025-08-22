import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { verticalListSortingStrategy, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { useDnD } from "../model/useDnD";

type Axis = "vertical" | "horizontal";


type SortableDndContextProps<T extends { id: number} > = {
  children: (items: T[]) => React.ReactNode;
  handleDragEnd: (newItems: T[], active: T) => void;
  data: T[];
  disabled?: boolean;
  axis?: Axis;
};

const SortableDndContext = <T extends { id: number }>({
  children,
  handleDragEnd,
  data,
  disabled = false,
  axis = "vertical",
}: SortableDndContextProps<T>) => {
  const { items, onDragEnd } = useDnD<T>(data || []);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const modifiers = axis === "vertical" ? [restrictToVerticalAxis] : [restrictToHorizontalAxis];
  const strategy = axis === "vertical" ? verticalListSortingStrategy : horizontalListSortingStrategy;

  return (
    <DndContext
      onDragEnd={onDragEnd(handleDragEnd)}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={modifiers}
    >
      <SortableContext items={items} disabled={disabled} strategy={strategy}>
        {children(items)}
      </SortableContext>
    </DndContext>
  );
};

export default SortableDndContext;
