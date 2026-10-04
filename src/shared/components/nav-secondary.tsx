"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar"

import Link from "next/link"
import {usePathname} from "next/navigation";
import { SearchIcon, Settings2Icon, CircleHelpIcon } from "lucide-react";

const items = [
  {
    title: "Settings",
    url: "#",
    icon: (
      <Settings2Icon
      />
    ),
  },
  {
    title: "Get Help",
    url: "#",
    icon: (
      <CircleHelpIcon
      />
    ),
  },
  {
    title: "Search",
    url: "/search",
    icon: (
      <SearchIcon
      />
    ),
  },
]

export function NavSecondary({...props}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props} className="border-t p-0 mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuButton key={item.title} tooltip={item.title} className="h-12 p-0" render={<Link href={item.url} />} isActive={item.url === pathname}>
              <div className="w-12 p-4">
                {item.icon}
              </div>
              <span>{item.title}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
