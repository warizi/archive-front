import Tiptap from "@/shared/components/ui/editor/Tiptap";
import { useState } from "react";

function NotePage() {
  const [ jsonValue, setJsonValue ] = useState("");
  return (
    <div>
      <Tiptap value={jsonValue} onChange={setJsonValue} />
    </div>
  );
};

export default NotePage;