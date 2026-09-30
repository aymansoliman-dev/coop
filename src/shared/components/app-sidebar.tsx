"use client"

import * as React from "react"

import { NavMain } from "@/shared/components/nav-main"
import { NavProjects } from "@/shared/components/nav-projects"
import { NavSecondary } from "@/shared/components/nav-secondary"
import { NavUser } from "@/shared/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/shared/components/ui/sidebar"
import { LayoutDashboardIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon } from "lucide-react"
import Image from 'next/image'
import { NewProjectDialog } from "@/features/projects/components/new-project-dialog"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon fill="currentColor" />
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
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon
        />
      ),
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
      icon: (
        <FileTextIcon
        />
      ),
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
      icon: (
        <FileTextIcon
        />
      ),
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
  navSecondary: [
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
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: (
        <DatabaseIcon
        />
      ),
    },
    {
      name: "Reports",
      url: "#",
      icon: (
        <FileChartColumnIcon
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: (
        <FileIcon
        />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar className="select-none" collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center gap-2 border-b h-(--header-height) p-4">
        {/*<CommandIcon className="size-5!" />*/}
        <Image src="https://res.cloudinary.com/dxlofja7z/image/upload/v1789662878/coop_dhxvx8.svg" width={48} height={48} alt="coop logo" className="w-6 h-6" loading="eager" />
        <span className="text-base font-light font-mono group-data-[collapsible=icon]:hidden">coop</span>
      </SidebarHeader>
      {/**/}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*  */}
        <NavProjects />
        {/*  */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/**/}
      <SidebarFooter>
        <NewProjectDialog />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
