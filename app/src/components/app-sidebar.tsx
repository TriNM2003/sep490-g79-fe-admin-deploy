import * as React from "react"
import {
  IconBone,
  IconBusinessplan,
  IconCamera,
  IconCat,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconPaw,
  IconReport,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PawPrint } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard tổng quan",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Quản lý trạm cứu hộ",
      url: "/admin/shelter",
      icon: IconPaw,
    },
    {
      title: "Quản lý tài khoản",
      url: "/admin/user",
      icon: IconUsers,
    },
    // {
    //   title: "Quản lý blog",
    //   url: "/admin/blog",
    //   icon: IconArticle,
    // },
        {
      title: "Quản lý loài của thú cưng",
      url: "/admin/species",
      icon: IconCat,
    },
        {
      title: "Quản lý giống của thú cưng",
      url: "/admin/breed",
      icon: IconBone,
    },
    {
      title: "Quản lý báo cáo",
      url: "/admin/report",
      icon: IconReport,
      items: [
        {
          title: "Báo cáo tài khoản",
          url: "/admin/report/user",
        },
        {
          title: "Báo cáo bài viết post",
          url: "/admin/report/post",
        },
        {
          title: "Báo cáo bài viết blog",
          url: "/admin/report/blog",
        },
      ],
    },
    {
      title: "Quản lý quyên góp",
      url: "/admin/donation",
      icon: IconBusinessplan,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Chỉnh sửa hệ thống",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <PawPrint className="!size-5" />
                <span className="text-base font-semibold">PawShelter</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
