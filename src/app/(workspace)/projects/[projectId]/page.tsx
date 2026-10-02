'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/useProject'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import ProjectOverview from '@/features/projects/components/project-overview'
import ProjectSettings from '@/features/projects/components/project-settings'
import { HomeIcon, SettingsIcon } from 'lucide-react'
import { EmptyPage } from '@/shared/components/empty-page'

export default function Project() {
    const { projectId } = useParams<{ projectId: string }>()
    const tabName = useSearchParams().get('tab')
    const { data: project = {}, isPending, isError } = useProject(projectId)

    if (isError) return <EmptyPage />
    if (!project || !projectId) return null

    return (
        <div className="relative">
            <Tabs defaultValue={tabName ?? "overview"} className="w-full">
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