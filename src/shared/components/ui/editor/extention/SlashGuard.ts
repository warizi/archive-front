import { Extension } from "@tiptap/react"
import { isFloatingMenu } from "../helper/isFloatingMenu"

export const SlashGuard = Extension.create({
  name: 'slash-guard',
  addKeyboardShortcuts() {
    const shouldBlock = () => {
      return isFloatingMenu(this.editor)
    }
    return {
      ArrowUp:   () => (shouldBlock() ? true : false),
      ArrowDown: () => (shouldBlock() ? true : false),
      Enter:     () => (shouldBlock() ? true : false),
    }
  },
})