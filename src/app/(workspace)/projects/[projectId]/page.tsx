'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/useProject'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import ProjectOverview from '@/features/projects/components/project-overview'
import ProjectSettings from '@/features/projects/components/project-settings'
import { HomeIcon, SettingsIcon } from 'lucide-react'
import { EmptyPage } from '@/shared/components/empty-page'

export default function Project() {
    const { projectId } = useParams<{ projectId: string }>()
    const tabName = useSearchParams().get('tab') ?? 'overview'
    const router = useRouter()
    const { data: project = {}, isError } = useProject(projectId)

    if (isError) return <EmptyPage />
    if (!project || !projectId) return null

    return (
        <div className="relative">
            <Tabs
                value={tabName}
                onValueChange={(value) => router.push(`/projects/${projectId}?tab=${value}`)}
                className="w-full"
            >
                <TabsList className="ml-auto right-0 z-30 sticky top-(--header-height)">
                    <TabsTrigger value="overview" style={{ borderTop: "none" }}>
                        <HomeIcon />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="settings" style={{ borderTop: "none" }}>
                        <SettingsIcon />
                        Settings
                    </TabsTrigger>
                    {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
                </TabsList>

                <TabsContent value="overview">
                    <ProjectOverview projectId={projectId} />
                </TabsContent>

                <TabsContent value="settings">
                    <ProjectSettings projectId={projectId} />
                </TabsContent>
            </Tabs>
        </div>
    )
}