import type { NoteFolderWithIdPresent } from "@/entities/note";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import Horizontal from "@/shared/components/ui/Horizontal";
import { useDndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import NoteFolderDropdownMenu from "./NoteFolderDropdownMenu";
import { Edit, Folder } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface DraggableNoteFolderItemProps {
  item: NoteFolderWithIdPresent;
  selectedFolder?: NoteFolderWithIdPresent | null;
  onClick?: (folder: NoteFolderWithIdPresent) => void;
  isAnyDragging?: boolean;
}

export default function DraggableNotefolderItem({ 
  item, 
  isAnyDragging, 
  onClick,
  selectedFolder
}: DraggableNoteFolderItemProps) {
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
      className="w-full min-w-0"
    >
      <AccordionItem value={`${item.id}`} className="w-full min-w-0">
        <div className="relative w-full min-w-0"
          ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
        >
          <div
            className={cn(
              `relative h-8 hover:bg-muted w-full min-w-0 rounded-md pr-2 pt-[6px] cursor-pointer ${over?.id === `droppable-inside-${item.id}` ? "bg-muted" : ""}`,
              { 'bg-muted': selectedFolder?.id === item.id },
              "group",
              "pl-0"
            )}
            style={{
              paddingLeft: `${depth * 12 + 8}px`
            }}
            onClick={() => onClick && onClick(item)}
          >
            <Horizontal className="w-full gap-1 min-w-0 relative">
              {child && child.length > 0 ? 
                (<AccordionTrigger className="p-0 px-1 m-0 cursor-pointer shrink-0 min-w-0" onClick={(e) => e.stopPropagation()} />)
                : (<AccordionTrigger className="p-0 px-1 m-0 cursor-pointer opacity-0 shrink-0 min-w-0" onClick={(e) => e.stopPropagation()} />)
              }
              <Horizontal align="center" className="gap-2 flex-1 min-w-0 overflow-hidden" >
                <Folder size={16} className="shrink-0"/>
                <span className="truncate text-sm flex-1 min-w-0 "> 
                  {name}
                </span>
              </Horizontal>
              <NoteFolderDropdownMenu
                noteFolder={item}
                asChild
              >
                <button type="button" className="shrink-0 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Edit size={16} />
                </button>
              </NoteFolderDropdownMenu>
            </Horizontal>
          </div>
          {child && child.length > 0 && (
            <AccordionContent className="pt-1 pb-0">
              {/* <div> */}
                {child.map((subItem) => (
                  <DraggableNotefolderItem key={subItem.id} item={subItem} isAnyDragging={isAnyDragging} onClick={onClick} selectedFolder={selectedFolder} />
                ))}
              {/* </div> */}
            </AccordionContent>
          )}
          <div className={`h-1 ${over?.id === `droppable-bottom-${item.id}` ? "bg-muted" : ""}`}
            style={{
              marginLeft: `${depth * 12 + 8}px`
            }}
          />
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