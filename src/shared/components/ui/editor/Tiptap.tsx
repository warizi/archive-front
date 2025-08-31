import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import CustomFloatingMenu from './CustomFloatingMenu'
import StyledHeading from './styled/StyledHeading'
import { SlashGuard } from './extention/SlashGuard'

function Tiptap({
  value,
  onChange
}: {
  value: string,
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }), 
      StyledHeading,
      SlashGuard
    ], // define your extension array
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'tiptap-content focus:outline-none min-h-[500px] py-4',
      },
    },
  });

  const handleClickFocus = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.target as HTMLElement
    const insideEditor = el.closest('.ProseMirror')
    const onMenu = el.closest('[data-menu]')
    if (insideEditor || onMenu) return // ProseMirror가 캐럿 배치하도록 둠
    editor?.chain().focus('end').run() // 빈 영역 클릭 시만 끝으로
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiptap Editor</CardTitle>
      </CardHeader>
      <CardContent className='min-h-[500px] cursor-text' onClick={handleClickFocus}>
        { editor && <EditorContent editor={editor}/>}
        { editor && <CustomFloatingMenu editor={editor} />}
        {
          editor && (
            <BubbleMenu editor={editor}>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                bold
              </button>
            </BubbleMenu>
          )
        }
      </CardContent>
    </Card>
  );
};

export default Tiptap;
