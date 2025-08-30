import { Slot } from "@radix-ui/react-slot";
import { useDraggableCtx } from "./DraggableContext";

type DraggableHandleProps = {
  asChild?: boolean;
  className?: string;
  // 필요하면 버튼 props 등 더 확장 가능
} & React.HTMLAttributes<HTMLElement>;

export function DraggableHandle({
  asChild,
  className,
  children,
  ...rest
}: DraggableHandleProps) {
  const { listeners, attributes } = useDraggableCtx();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={`cursor-grab active:cursor-grabbing touch-none select-none ${className ?? ""}`}
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </Comp>
  );
}
