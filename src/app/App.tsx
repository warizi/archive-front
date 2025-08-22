import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DefaultRouter } from "./route"
import { RouterProvider } from "react-router-dom";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/shared/components/model/ThemeProvider";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <RouterProvider router={DefaultRouter}/>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
