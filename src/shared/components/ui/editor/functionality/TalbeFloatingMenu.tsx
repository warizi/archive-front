import { Editor, FloatingMenu } from "@tiptap/react";
import { isTableFloatingMenu } from "../helper/IsTableFloatingMenu";
import { Card } from "../../card";
import { Button } from "../../button";
import Horizontal from "../../Horizontal";

interface TalbeFloatingMenuProps {
  editor: Editor;
}
function TalbeFloatingMenu({ editor }: TalbeFloatingMenuProps) {
  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ state }) => isTableFloatingMenu(state)}
      tippyOptions={{
        placement: "top-start", // 테이블 위
        getReferenceClientRect: () => {
          const { $from } = editor.state.selection
          for (let d = $from.depth; d > 0; d--) {
            const node = $from.node(d)
            if (node.type.name === "table") {
              const dom = editor.view.nodeDOM($from.before(d))
              if (dom instanceof HTMLElement) {
                return dom.getBoundingClientRect()
              }
            }
          }
          return editor.view.dom.getBoundingClientRect()
        },
        onShow: () => {},
        onHide: () => {},
      }}
    >
      <Card className="p-1">
        <Horizontal className="gap-1">
          <Button 
            type="button"
            variant={"ghost"} 
            size={"sm"} 
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            행 추가
          </Button>
          <Button 
            type="button"
            variant={"ghost"} 
            size={"sm"} 
            onClick={() => editor.chain().focus().deleteRow().run()}
          >
            행 삭제
          </Button>
          <Button 
            type="button"
            variant={"ghost"} 
            size={"sm"} 
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            열 추가
          </Button>
          <Button 
            type="button"
            variant={"ghost"} 
            size={"sm"} 
            onClick={() => editor.chain().focus().deleteColumn().run()}
          >
            열 삭제
          </Button>
        </Horizontal>
      </Card>
    </FloatingMenu>
  );
};

export default TalbeFloatingMenu;