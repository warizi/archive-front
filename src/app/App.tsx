import { Button } from "@/shared/components/ui/button"
import { Toaster } from "@/shared/components/ui/sonner"
import { toast } from "sonner"


function App() {

  return (
    <>
    <div className="bg-red-50">test</div>
    <Button
     onClick={() => {
      toast("Button clicked!")
     }}
    >button</Button>
      <Toaster />
    </>
  )
}

export default App
