import { type Editor } from '@tiptap/react'

export const isFloatingMenu = (editor: Editor) => {
  const { state } = editor
  const { $from } = state.selection
  const textBefore = $from.parent.textBetween(
    0,
    $from.parentOffset,
    undefined,
    ""
  );

  return /^\/[^\s]*$/.test(textBefore);
}