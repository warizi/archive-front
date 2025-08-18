import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DefaultRouter } from "./route"
import { RouterProvider } from "react-router-dom";
import { SidebarProvider } from "@/shared/components/ui/sidebar";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <RouterProvider router={DefaultRouter}/>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App
