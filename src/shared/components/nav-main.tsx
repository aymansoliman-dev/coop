"use client"

import { LayoutDashboardIcon } from "@/assets/icons/layout-dashboard-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar"

import Link from "next/link"
import {usePathname} from "next/navigation";

const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    // {
    //   title: "Projects",
    //   url: "/projects",
    //   icon: (
    //     <FolderIcon
    //     />
    //   ),
    // },
    // {
    //   title: "Team",
    //   url: "/team",
    //   icon: (
    //     <UsersIcon
    //     />
    //   ),
    // },
]

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarGroup className="border-b p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => (
            <SidebarMenuButton key={item.title} tooltip={item.title} className="h-12 p-0" render={<Link href={item.url} />} isActive={item.url === pathname}>
              <div className="w-12 p-4">
                {item.icon}
              </div>
              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
