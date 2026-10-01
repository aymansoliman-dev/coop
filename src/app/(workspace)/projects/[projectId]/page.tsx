'use client'

import { useParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/useProject'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import ProjectOverview from '@/features/projects/components/project-overview'
import ProjectSettings from '@/features/projects/components/project-settings'
import { HomeIcon, SettingsIcon } from 'lucide-react'

export default function Project() {
    const { projectId } = useParams<{ projectId: string }>()
    const { data: project = {}, isPending } = useProject(projectId)
    // TODO: Add Empty Page on Failure to Load Project, and Loading Page on Pending

    if (!project || !projectId) return null

    return (
        <div className="relative">
            <span style={{ background: project.theme }} className="ball absolute w-lg aspect-square rounded-full right-0 -top-8 opacity-15 blur-[640rem]"></span>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="absolute right-0 z-30">
                    <TabsTrigger value="overview">
                        <HomeIcon />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                        <SettingsIcon />
                        Settings
                    </TabsTrigger>
                    {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
                </TabsList>

                <TabsContent value="overview">
                    <ProjectOverview projectId={projectId} />
                </TabsContent>

                <TabsContent value="settings">
                    <ProjectSettings proejctId={projectId} />
                </TabsContent>
            </Tabs>
        </div>
    )
}