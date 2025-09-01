import { FloatingMenu } from "@tiptap/react";
import { useEditorState, type Editor } from "@tiptap/react";
import { Card, CardContent, CardDescription } from "../card";
import { Heading1, Heading2, Heading3, List, ListOrdered, Minus, type LucideIcon } from "lucide-react";
import Horizontal from "../Horizontal";
import Vertical from "../Vertical";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { isFloatingMenu } from "./helper/isFloatingMenu";
import { deleteSlashText } from "./helper/deleteSlashText";
import EmptyMessageCard from "../EmptyMessageCard";

interface CustomFloatingMenuItem {
  id: number;
  icon: LucideIcon;
  title: string;
  searchText: string;
  action: (editor: Editor) => void;
}

const customFloatingMenuItems: CustomFloatingMenuItem[] = [
  {
    id: 1,
    icon: Heading1,
    title: "제목 1",
    searchText: "heading1, 헤딩1, 1, 제목1",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .toggleHeading({ level: 1 })
        .run();
    },
  },
  {
    id: 2,
    icon: Heading2,
    title: "제목 2",
    searchText: "heading2, 헤딩2, 2, 제목2",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .toggleHeading({ level: 2 })
        .run();
    }
  },
  {
    id: 3,
    icon: Heading3,
    title: "제목 3",
    searchText: "heading3, 헤딩3, 3, 제목3",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .toggleHeading({ level: 3 })
        .run();
    }
  },
  {
    id: 4,
    icon: List,
    title: "글머리 기호 목록",
    searchText: "list, 글머리 기호, 목록",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .toggleList('bulletList', 'listItem')
        .run();
    }
  },
  {
    id: 5,
    icon: ListOrdered,
    title: "번호 매기기 목록",
    searchText: "list, 번호 매기기, 목록",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .toggleList('orderedList', 'listItem')
        .run();
    }
  }, 
  {
    id: 6,
    icon: Minus,
    title: "구분선",
    searchText: "horizontal, 경계선, 구분선",
    action: (editor) => {
      deleteSlashText(editor);
      editor
        .chain()
        .focus()
        .setHorizontalRule()
        .run();
    }
  }
]

interface CustomFloatingMenuProps {
  editor: Editor;
}

function CustomFloatingMenu(
  { editor }: CustomFloatingMenuProps
) {
  const { 
    searchText,
  } = useEditorState({
    editor,
    selector: snapshot => ({ 
      searchText: snapshot.editor.state.selection.$from.parent.textContent.split("/")[1] || ""
    }),
  })
  const [ selectedItem, setSelectedItem ] = useState<CustomFloatingMenuItem>(customFloatingMenuItems[0]);
  const [ isShow, setIsShow ] = useState(false);
  const [ filteredItems, setFilteredItems ] = useState<CustomFloatingMenuItem[]>(customFloatingMenuItems);

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeydown = (event: KeyboardEvent) => {
    const idx = filteredItems.findIndex(i => i.id === selectedItem.id);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedItem(filteredItems[(idx + 1) % filteredItems.length]);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      selectedItem.action(editor);
    }
  };
  
  useEffect(() => {
    const previousHandleKeyDown = editor?.view.props.handleKeyDown;
    
    editor?.view.setProps({
      handleKeyDown(
        view,
        event: KeyboardEvent
      ) {
        if (
          isShow &&
          (event.key === "Enter" || event.key === "Escape" || event.key === "ArrowUp" || event.key === "ArrowDown")
        ) {
          onKeydown(event); // 우리의 키 처리 로직 추가
          return true; // ProseMirror 기본 동작 방지
        }
        return (
          previousHandleKeyDown?.(view, event) || false
        ); // 기존 로직도 유지
      },
    });

    return () => {
      if (editor?.view) {
        editor.view.setProps({
          handleKeyDown: previousHandleKeyDown || undefined,
        });
      }
    };
  }, [editor.view, isShow, onKeydown])

  useEffect(() => {
    if (isShow) {
      const filtered = customFloatingMenuItems.filter(item =>
        item.searchText.includes(searchText)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0]);
    }
  }, [isShow, searchText])

  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ editor }) => {
        return isFloatingMenu(editor);
      }}
      tippyOptions={{
        placement: 'bottom-start',
        onShow: () => {setSelectedItem(customFloatingMenuItems[0]); setIsShow(true);},
        onHide: () => setIsShow(false),
      }}
    >
      <Card className="p-2 rounded-md w-[200px]">
        <CardContent className="p-0 text-sm">
          <CardDescription className="text-xs mb-1">
            기본
          </CardDescription>
          <Vertical className="gap-1">
            {filteredItems.length === 0 && (
              <EmptyMessageCard message="결과가 없습니다." className="p-2"/>
            )}
            {filteredItems.map(item => (
              <CustomFloatingMenuItem
                key={item.id}
                item={item}
                isSelected={selectedItem.id === item.id}
                onHover={(item: CustomFloatingMenuItem) => setSelectedItem(item)}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  item.action(editor);
                }}
              />
            ))}
          </Vertical>
        </CardContent>
      </Card>
    </FloatingMenu>
  );
};

export default CustomFloatingMenu;

function CustomFloatingMenuItem({ 
  item, 
  isSelected, 
  onHover,
  onClick
}: { 
  item: CustomFloatingMenuItem, 
  isSelected: boolean,
  onHover: (item: CustomFloatingMenuItem) => void,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}) {
  const Icon = item.icon;
  return (
    <Horizontal 
      className={
        cn(
          "gap-2 cursor-pointer text-sm px-2 py-1 rounded-sm",
          {
            "bg-muted": isSelected
          }
        )
      }
      onMouseEnter={() => onHover(item)}
      onClick={onClick}
    >
      <Icon className="h-[20px] w-[20px]" />
      <span>{item.title}</span>
    </Horizontal>
  );
};
