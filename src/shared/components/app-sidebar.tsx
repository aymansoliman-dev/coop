"use client"

import * as React from "react"

import { NavMain } from "@/shared/components/nav-main"
import { NavProjects } from "@/shared/components/nav-projects"
import { NavSecondary } from "@/shared/components/nav-secondary"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton } from "@/shared/components/ui/sidebar"
import { CameraIcon, FileTextIcon, DatabaseIcon, FileChartColumnIcon, FileIcon } from "lucide-react"
import { LogoutIcon } from "@/assets/icons"
import { LayoutDashboardIcon } from "@/assets/icons"
import Image from 'next/image'
import { NewProjectDialog } from "@/features/projects/components/new-project-dialog"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "./ui/toast"

const data = {
  navMain: [
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
  const router = useRouter();
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token")
    router.push("/login")
    toast.add({
      type: "success",
      description: "logged out successfully",
    })
  }, [router])

  return (
    <Sidebar className="select-none" collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center gap-4 border-b h-(--header-height) p-0">
        {/*<CommandIcon className="size-5!" />*/}
        <Image src="https://res.cloudinary.com/dxlofja7z/image/upload/v1789662878/coop_dhxvx8.svg" width={32} height={32} alt="coop logo" className="w-12 h-full" loading="eager" />
        <span className="text-2xl group-data-[collapsible=icon]:hidden">coop</span>
      </SidebarHeader>
      {/**/}
      <SidebarContent>
        <NavMain />
        {/*  */}
        <NavProjects />
        {/*  */}
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      {/**/}
      <SidebarFooter className="gap-0">
        <NewProjectDialog />
        {/*  */}
        <SidebarMenuButton className="h-12 p-0 gap-0" tooltip="Logout" onClick={handleLogout} >
          <div className="w-12 p-4">
            <LogoutIcon />
          </div>
          <span className="group-data-[collapsible=icon]:hidden h-full grow flex items-center">Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
