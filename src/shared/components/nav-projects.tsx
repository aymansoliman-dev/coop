"use client"

import { useState } from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible"
import { ChevronRightIcon, BoxIcon, FolderIcon } from "lucide-react"
import { useProjectsList } from '@/features/projects/hooks/useProjectsList'
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

export function NavProjects() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: projectsList } = useProjectsList()
  const currentProjectId = useSearchParams().get('id')

  if (!projectsList) return null

  return (
    <div className="mx-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden relative px-0">
          <div className="flex items-center justify-between gap-4 z-10" onClick={() => setIsOpen(!isOpen)}>        
            <CollapsibleTrigger render={
              <SidebarMenuButton className={`w-full overflow-hidden h-fit py-0 pl-0 pr-2`} data-active={isOpen}>
                <SidebarGroupLabel className="text-md font-light cursor-pointer flex-1 flex gap-3 text-white">
                  <FolderIcon fill="currentColor" />
                  Projects
                </SidebarGroupLabel>
                <ChevronRightIcon className={`size-4 transition-all${isOpen? " rotate-90" : ""}`} />
                <span className="sr-only">Toggle details</span>
              </SidebarMenuButton>
            }>
            </CollapsibleTrigger>
          </div>

          { projectsList.length > 0 && 
            <CollapsibleContent className="space-y-1 overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down absolute right-0 left-0 pt-9 px-0">
              {projectsList.map((project: any) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton isActive={project.id === currentProjectId} render={
                    <Link href={`/project?id=${project.id}`} className="flex items-center gap-2"> {/* TODO: Make it a dynamic URL */}
                      { project.logo ? <Image src={project.logo} alt={project.name} width={16} height={16} /> : <BoxIcon color={project.theme} fill={project.theme} />}
                      <span>{project.name}</span>
                    </Link>
                  }>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </CollapsibleContent>
        }
        
        </SidebarGroup>
      </Collapsible>
    </div>
  )
}