import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom"

import { IconChevronDown, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon?: Icon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            const isDropdown = !!item.items?.length;
            const isOpen = openMenus[item.title] ?? false;

            return (
              <div key={item.title}>
                <SidebarMenuItem className="py-1 font-medium">
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() =>
                      isDropdown
                        ? toggleMenu(item.title)
                        : item.url && navigate(item.url)
                    }
                    className={`cursor-pointer w-full flex justify-between items-center ${
                      isActive ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </div>
                    {isDropdown &&
                      (isOpen ? (
                        <IconChevronDown className="w-4 h-4" />
                      ) : (
                        <IconChevronRight className="w-4 h-4" />
                      ))}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isDropdown && isOpen && (
                  <div className="ml-6 flex flex-col gap-1 pt-1">
                    {item.items!.map((sub) => {
                      const isSubActive = location.pathname === sub.url;
                      return (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton
                            onClick={() => navigate(sub.url)}
                            className={`text-md cursor-pointer pl-6 ${
                              isSubActive
                                ? "bg-muted text-accent-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {sub.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
