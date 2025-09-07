import { useState } from "react";
import type { NoteFolderWithIdPresent } from "@/entities/note";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { flattenFolders, unflattenFoldersPreserveMeta } from "../model/formatList";
import { moveNode, parseDrop } from "../model/noteFolderMove";
import { toast } from "sonner";
import DraggableNotefolderItem from "./DragableNoteFolderItem";
import DroppableNoteFolder from "./DroppableNoteFolder";
import { useMoveNoteFolder } from "../../update-notefolder";
import axios from "axios";

interface NoteFolderListProps {
  data?: NoteFolderWithIdPresent[];
  selectedFolder: NoteFolderWithIdPresent | null;
  onClickFolder: (folder: NoteFolderWithIdPresent) => void;
}

function NoteFolderList({ 
  data,
  selectedFolder,
  onClickFolder
}: NoteFolderListProps) {
  const list = unflattenFoldersPreserveMeta(data || [])
  const [ isActiveItem, setIsActiveItem ] = useState<NoteFolderWithIdPresent | null>(null);

  const { mutate } = useMoveNoteFolder();

  const flatList = flattenFolders(list);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 400,      // ms: 이 시간 동안 눌러야 드래그 시작
        tolerance: 6,    // px: 지연 중 허용 이동치(손가락 떨림 보정)
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setIsActiveItem(flatList.find(item => item.id === active.id) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setIsActiveItem(null);
    if (!over) return;

    const drop = parseDrop(String(over.id));
    const activeId = Number(active.id);
    if (!drop || Number.isNaN(activeId)) return;

    const ok = moveNode(list, activeId, drop);
    if (!ok) {
      toast.error("해당 위치로 이동할 수 없습니다.", {
        description: "폴더 최대 깊이 3을 넘어갈 수 없습니다."
      });
      return;
    }

    const updatedFlatList = flattenFolders(list);
    mutate(updatedFlatList, {
      onSuccess: () => {
        toast.success("폴더가 이동되었습니다.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          toast.error(message ?? "폴더 이동에 실패했습니다.");
        }
      }
    });
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DroppableNoteFolder list={list} onSelect={onClickFolder} selectedFolder={selectedFolder} />
      <DragOverlay>
        {isActiveItem ? (
          <div className="opacity-50">
            <DraggableNotefolderItem item={isActiveItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default NoteFolderList;


