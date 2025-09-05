import { type Editor } from "@tiptap/react";

export const deleteSlashText = (editor: Editor) => {

  const { $from } = editor.state.selection; // 현재 커서 위치 정보
  const lineStart = $from.start(); // 현재 줄의 시작 위치
  const lineEnd = $from.end(); // 현재 줄의 끝 위치
  
  // 줄 전체 삭제
  editor.commands.deleteRange({
    from: lineStart, // 현재 줄의 시작 위치
    to: lineEnd, // 현재 줄의 끝 위치
  });
}

