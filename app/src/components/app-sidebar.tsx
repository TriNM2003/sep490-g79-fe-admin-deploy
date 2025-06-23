import { BookText, Calendar, FlagTriangleLeft, HandCoins, Home, House, Inbox, PawPrint, Search, Settings, UserPen } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard tổng quan",
    url: "/admin/dashboard",
    icon: House,
  },
  {
    title: "Quản lý trạm cứu hộ",
    url: "/admin/shelter",
    icon: PawPrint,
  },
  {
    title: "Quản lý người dùng",
    url: "/admin/user",
    icon: UserPen,
  },
  {
    title: "Quản lý blog",
    url: "/admin/blog",
    icon: BookText,
  },
  {
    title: "Quản lý báo cáo",
    url: "/admin/report",
    icon: FlagTriangleLeft,
  },
  {
    title: "Quản lý quyên góp",
    url: "/admin/donation",
    icon: HandCoins,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PawShelter</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}