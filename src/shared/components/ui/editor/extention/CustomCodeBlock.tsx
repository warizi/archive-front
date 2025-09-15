import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { Plugin, PluginKey } from "prosemirror-state"
import { createLowlight } from "lowlight"

// highlight.js 언어 가져오기
import javascript from "highlight.js/lib/languages/javascript"
import xml from "highlight.js/lib/languages/xml"

const lowlight = createLowlight()
lowlight.register("javascript", javascript)
lowlight.register("xml", xml)

const CustomCodeBlock = CodeBlockLowlight.extend({
    addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("custom-code-block-indent"),
        props: {
          handleKeyDown: (view, event) => {
            const { state, dispatch } = view
            const { selection } = state
            const { $from } = selection

            // 코드블럭 안에서만 처리
            if (!this.editor.isActive("codeBlock")) return false

            // --- Enter ---
            if (event.key === "Enter") {
              event.preventDefault()

              // 현재 줄의 시작 offset 찾기
              const parent = $from.parent
              const textBefore = parent.textBetween(0, $from.parentOffset, "\n")
              const lastLine = textBefore.split("\n").pop() ?? ""

              // 선행 공백만 추출
              const match = lastLine.match(/^\s+/)
              const indent = match ? match[0] : ""

              dispatch(state.tr.insertText("\n" + indent, selection.from, selection.to))
              return true
            }

            // --- Tab ---
            if (event.key === "Tab") {
              event.preventDefault()
              dispatch(state.tr.insertText("  ", selection.from, selection.to))
              return true
            }

            return false
          },
        },
      }),
    ]
  },
}).extend({
  lowlight,
  addAttributes() {
    return {
      class: {
        default:
          "bg-gray-900 text-gray-100 font-mono p-4 rounded-md overflow-x-auto text-sm",
      },
    }
  },
})

export default CustomCodeBlock