import type { NoteFolderWithIdPresent } from "@/entities/note";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import Horizontal from "@/shared/components/ui/Horizontal";
import { useDndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import NoteFolderContextMenu from "./NoteFolderContextMenu";
import { Folder } from "lucide-react";

export default function DraggableNotefolderItem({ item, isAnyDragging }: { item: NoteFolderWithIdPresent, isAnyDragging?: boolean }) {
  const {
    attributes, 
    listeners, 
    setNodeRef, 
    transform,
    isDragging
  } = useDraggable({
    id: item.id,
    data: item
  });

  const {
    over
  } = useDndContext();

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const { name, depth, child } = item as NoteFolderWithIdPresent;

  if (isDragging) return (
    <div 
      className="relative opacity-30"
      {...attributes}
      {...listeners}
    >
      <div
        className={`pl-${depth * 4} relative h-8 hover:bg-muted w-full rounded-md px-2 pt-1 cursor-pointer`}
      >
        <Horizontal justify="between" className="w-full">
          {name}
        </Horizontal>
      </div>
      <div className={`ml-${item.depth * 4} h-1`}/>
    </div>
  );

  return (
    <Accordion
      type="multiple"
      disabled={isDragging} 
    >
      <AccordionItem value={`${item.id}`}>
        <div className="relative"
          ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
        >
          <div
            className={`pl-${depth * 4} relative h-8 hover:bg-muted w-full rounded-md px-2 pt-1 cursor-pointer ${over?.id === `droppable-inside-${item.id}` ? "bg-muted" : ""}`}
          >
            <NoteFolderContextMenu noteFolder={item} asChild>
              <Horizontal justify="between" className="w-full gap-2">
                <Horizontal align="center" className="gap-2 w-full overflow-hidden">
                  <Folder size={16} className="shrink-0"/>
                  <span className="truncate text-sm">
                    {name}
                  </span>
                </Horizontal>
                {child && child.length > 0 && <AccordionTrigger className="p-0 px-1 m-0 cursor-pointer" />}
              </Horizontal>
            </NoteFolderContextMenu>
          </div>
          {child && child.length > 0 && (
            <AccordionContent className="pb-2">
              {/* <div> */}
                {child.map((subItem) => (
                  <DraggableNotefolderItem key={subItem.id} item={subItem} isAnyDragging={isAnyDragging} />
                ))}
              {/* </div> */}
            </AccordionContent>
          )}
          <div className={`ml-${item.depth * 4} h-1 ${over?.id === `droppable-bottom-${item.id}` ? "bg-muted" : ""}`}/>
           {
              isAnyDragging && (
                <>
                  <DroppableInside item={item} />
                  <DroppableBottom item={item} />
                </>
              )
            }
        </div>
      </AccordionItem>
    </Accordion>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
function DroppableInside({
  item
}: {
  item: NoteFolderWithIdPresent
}) {
  const droppableId = `droppable-inside-${item.id}`;
  const {
    setNodeRef: setDroppableInsideNodeRef
  } = useDroppable({
    id: droppableId,
    data: item
  });

  return (
    <div ref={setDroppableInsideNodeRef} className={`absolute top-0 left-0 border-none h-4 w-full ml-${item.depth * 4}`} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
function DroppableBottom({
  item
}: {
  item: NoteFolderWithIdPresent
}) {
  const droppableId = `droppable-bottom-${item.id}`;
  const {
    setNodeRef: setDroppableBottomNodeRef
  } = useDroppable({
    id: droppableId,
    data: item
  });

  return (
    <div ref={setDroppableBottomNodeRef} className={`absolute bottom-0 left-0 border-none h-4 w-full ml-${item.depth * 4}`} />
  );
}