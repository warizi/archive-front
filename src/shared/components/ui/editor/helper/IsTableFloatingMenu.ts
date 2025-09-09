import type { EditorState } from "@tiptap/pm/state";

export const isTableFloatingMenu = (state: EditorState) => {
  const { selection } = state

  // 일반 커서 선택이더라도, 테이블 내부에 있으면 true
  const { $from } = selection
  for (let d = $from.depth; d > 0; d--) {
    const node = $from.node(d)
    if (node.type.name === "table") {
      return true
    }
  }

  return false
}