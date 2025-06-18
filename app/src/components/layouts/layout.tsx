import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
  return (
    <>
    <Header />
    <SidebarProvider className="px-2 py-2">
      <AppSidebar />
       <SidebarInset className="flex flex-row">
        <SidebarTrigger />
        <Outlet />
       </SidebarInset>
    </SidebarProvider>
    </>
    
  )
}