import type { DraggableAttributes, DraggableSyntheticListeners } from "@dnd-kit/core";
import { useContext, createContext } from "react";

type Ctx = {
  listeners: DraggableSyntheticListeners | undefined;
  attributes: DraggableAttributes;
};

export const DraggableContext = createContext<Ctx | null>(null);

export function useDraggableCtx() {
  const ctx = useContext(DraggableContext);
  if (!ctx) throw new Error("DraggableHandle must be used inside DraggableWrapper");
  return ctx;
}
