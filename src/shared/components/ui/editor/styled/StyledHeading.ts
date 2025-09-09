import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'

const StyledHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level ?? 1
    const clsByLevel: Record<number, string> = {
      1: 'scroll-m-20 text-3xl font-bold tracking-tight text-foreground dark:text-gray-300',
      2: 'scroll-m-20 text-2xl font-semibold tracking-tight pb-2 text-foreground dark:text-gray-300',
      3: 'scroll-m-20 text-1xl font-semibold tracking-tight pb-2 text-foreground dark:text-gray-300',
    }
    const cls = clsByLevel[level] ?? 'text-xl font-semibold dark:text-gray-300'
    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, { class: cls }),
      0,
    ]
  },
})
export default StyledHeading