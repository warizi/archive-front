import type { NoteFolderWithIdPresent } from "@/entities/note";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import DraggableNotefolderItem from "./DragableNoteFolderItem";
import EmptyMessageCard from "@/shared/components/ui/EmptyMessageCard";

export default function DroppableNoteFolder({
  list,
  onSelect,
  selectedFolder
}: {
  list: NoteFolderWithIdPresent[],
  onSelect: (folder: NoteFolderWithIdPresent) => void,
  selectedFolder: NoteFolderWithIdPresent | null
}) {
  const { 
    setNodeRef
  } = useDroppable({
    id: "droppable-note-folder"
  });
  const [ isAnyDragging, setIsAnyDragging ] = useState(false);
  useDndMonitor({
    onDragStart() {
      setIsAnyDragging(true);
    },
    onDragEnd() {
      setIsAnyDragging(false);
    },
  })
  return (
    <div className="w-full px-2" ref={setNodeRef}>
      {
        list.length === 0 && (
          <EmptyMessageCard message="폴더가 없습니다. 새 폴더를 생성하세요." />
        )
      }
      {
        list.map(item => (
          <DraggableNotefolderItem key={item.id} item={item} isAnyDragging={isAnyDragging} onClick={onSelect} selectedFolder={selectedFolder} />
        ))
      }
    </div>
  );
}