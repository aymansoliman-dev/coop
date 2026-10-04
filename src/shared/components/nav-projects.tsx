"use client"

import { useCallback, useState } from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible"
import { ChevronRightIcon, TrashIcon, SettingsIcon } from "lucide-react"
import { MoreVerticalIcon } from '@/assets/icons'
import { ProjectsIcon, BoxIcon } from '@/assets/icons/'
import { useProjectsList } from '@/features/projects/hooks/useProjectsList'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAuthUser } from '@/features/auth/hooks/useAuthUser'
import { useDeleteProject } from '@/features/projects/hooks/useDeleteProject'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { useRouter } from 'next/navigation'

export function NavProjects() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: projectsList } = useProjectsList()
  const pathname = usePathname()
  const currentProjectId = pathname.match(/^\/projects\/([^/]+)/)?.[1]
  const { data: authenticatedUser } = useAuthUser()
  const { mutate } = useDeleteProject()
  const router = useRouter()

  const deleteProject = useCallback((projectId: string) => {
    mutate(projectId)
  }, [mutate])

  const goToProjectSettings = useCallback((projectId: string) => {
    router.push(`/projects/${projectId}?tab=settings`)
  }, [])

  if (!projectsList) return null         

  return (
    <div className="grow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full h-full">
        <SidebarGroup className="h-full p-0">
          <div className="flex items-center justify-between gap-4 z-10" onClick={() => setIsOpen(!isOpen)}>        
            <CollapsibleTrigger render={
              <SidebarMenuButton tooltip="Projects" className={`w-full overflow-hidden h-fit p-2`} data-active={isOpen}>
                <SidebarGroupLabel className={`text-md font-light cursor-pointer flex-1 flex gap-3 ${isOpen ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
                  <ProjectsIcon
                    className={isOpen ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"}
                    fill={isOpen ? "currentColor" : "none"}
                  />
                  <span className="group-data-[collapsible=icon]:hidden">Projects</span>
                </SidebarGroupLabel>
                <ChevronRightIcon className={`group-data-[collapsible=icon]:hidden size-4 transition-all${isOpen? " rotate-90" : ""}`} />
                <span className="sr-only">Toggle details</span>
              </SidebarMenuButton>
            }>
            </CollapsibleTrigger>
          </div>

          { projectsList.length > 0 && 
            <CollapsibleContent className="grow space-y-1 static transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down right-0 left-0 px-0">
              <ScrollArea className="h-72 outline group-data-[collapsible=icon]:outline-none scroll-fade-b">
                <ul>
                  {projectsList.map((project: any) => (
                      <SidebarMenuButton key={project.id} tooltip={project.name} className="h-12 p-0" isActive={project.id === currentProjectId} render={
                        <div className="project-link flex items-center justify-between gap-2 w-full">
                          <Link href={`/projects/${project.id}`} className="flex items-center gap-2 grow h-full">
                            <div className="w-12 p-4">
                              { 
                                project.logo ? 
                                  <Image src={project.logo} alt={project.name} width={24} height={24} unoptimized className='shrink-0 object-cover object-center' /> 
                                  : <BoxIcon color={project.theme} fill={project.theme} />
                              }
                            </div>
                            <span className="group-data-[collapsible=icon]:hidden">{project.name}</span>
                          </Link>
                          { authenticatedUser?.id === project.owner_id &&
                            <DropdownMenu>
                              <DropdownMenuTrigger render={
                                <button className="h-full mr-3 group-data-[collapsible=icon]:hidden">
                                 <MoreVerticalIcon className="size-4" color='currentColor' />
                                </button>
                              } />
                              <DropdownMenuContent>
                                <DropdownMenuGroup>
                                  <DropdownMenuItem variant="default" onClick={(e) => {e.preventDefault(); goToProjectSettings(project.id)}} className="cursor-pointer">
                                    <SettingsIcon />
                                    <span>Settings</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem variant="destructive" onClick={(e) => { e.preventDefault(); deleteProject(project.id) }} className="cursor-pointer">
                                    <TrashIcon />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          }
                        </div>
                      }>
                      </SidebarMenuButton>
                  ))}
                </ul>
              </ScrollArea>
            </CollapsibleContent>
        }
        
        </SidebarGroup>
      </Collapsible>
    </div>
  )
}