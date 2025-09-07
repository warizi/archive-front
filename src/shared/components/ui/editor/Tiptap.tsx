import { useEditor, EditorContent, type JSONContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CustomFloatingMenu from './CustomFloatingMenu'
import StyledHeading from './styled/StyledHeading'
import { SlashGuard } from './extention/SlashGuard'

function Tiptap({
  value,
  onChange
}: {
  value: JSONContent,
  onChange: (value: JSONContent) => void
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
      console.log('editor', editor.getJSON())
      const json = editor.getJSON()
      onChange(json)
    },
    editorProps: {
      attributes: {
        class:
          'tiptap-content focus:outline-none min-h-[500px] h-full py-4',
      },
    },
  });

  return (
    <div>
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
    </div>
  );
};

export default Tiptap;
