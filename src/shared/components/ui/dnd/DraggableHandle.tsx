import { Slot } from "@radix-ui/react-slot";
import { useDraggableItem } from "./hooks/useDraggableItem";

type DraggableHandleProps = {
  itemId: number;
  asChild?: boolean;
  className?: string;
  // 필요하면 버튼 props 등 더 확장 가능
} & React.HTMLAttributes<HTMLElement>;

export function DraggableHandle({
  itemId,
  asChild,
  className,
  children,
  ...rest
}: DraggableHandleProps) {
  const { listeners, attributes } = useDraggableItem(itemId);
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={`cursor-grab w-fit active:cursor-grabbing touch-none select-none ${className ?? ""}`}
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </Comp>
  );
}
