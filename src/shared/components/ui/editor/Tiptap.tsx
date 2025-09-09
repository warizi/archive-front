import { useEditor, EditorContent, type JSONContent } from '@tiptap/react'
// import { BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CustomFloatingMenu from './functionality/CustomFloatingMenu'
import StyledHeading from './styled/StyledHeading'
import { SlashGuard } from './extention/SlashGuard'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TalbeFloatingMenu from './functionality/TalbeFloatingMenu'

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
      SlashGuard,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'table-auto border-collapse border border-gray-400 w-full text-sm text-left'
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-300'
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gray-200 dark:bg-gray-200 border border-gray-400 px-3 py-2 font-semibold text-gray-700'
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-400 px-3 py-2 '
        },
      }),
    ], // define your extension array
    content: value,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      onChange(json)
    },
    editorProps: {
      attributes: {
        class:
          'tiptap-content focus:outline-none min-h-[500px] h-full py-4 dark:text-gray-300',
        lang: 'ko',
        spellcheck: 'false',
      },
    },
  });

  return (
    <div>
      { editor && <EditorContent editor={editor}/>}
      { editor && <CustomFloatingMenu editor={editor} />}
      { editor && <TalbeFloatingMenu editor={editor} />}
      {/* {
        editor && (
          <BubbleMenu editor={editor}>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              bold
            </button>
          </BubbleMenu>
        )
      } */}
    </div>
  );
};

export default Tiptap;
