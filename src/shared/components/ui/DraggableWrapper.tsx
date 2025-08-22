import React from "react";
import { useDraggableItem } from "../model/useDraggableItem";
import { Slot } from "@radix-ui/react-slot";

type DraggableWrapperProps = {
  id: number;
  children: React.ReactNode;
  className?: string;
  /** 드래그 중에 적용할 Tailwind 클래스 */
  asChild?: boolean;
};

function DraggableWrapper({
  id,
  children,
  className,
  asChild,
  ...rest
}: DraggableWrapperProps) {
  const { ref, style, listeners, attributes, isDragging } = useDraggableItem(id);

  const Comp = asChild ? Slot : "div"
  if (isDragging) {
    return (
      <Comp
        ref={ref}
        style={style}
        className={className}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref}
      style={style}
      className={className}
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export default DraggableWrapper;
