'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/useProject'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import ProjectOverview from '@/features/projects/components/project-overview'
import ProjectSettings from '@/features/projects/components/project-settings'
import { HomeIcon, SettingsIcon } from 'lucide-react'
import { EmptyPage } from '@/shared/components/empty-page'
import { getSelectionForeground } from '@/shared/lib/utils' 

export default function Project() {
    const { projectId } = useParams<{ projectId: string }>()
    const tabName = useSearchParams().get('tab') ?? 'overview'
    const router = useRouter()
    const { data: project = {}, isError } = useProject(projectId)

    if (isError) return <div className="w-full h-full flex justify-center items-center"><EmptyPage /></div>
    if (!project || !projectId) return null

    const selectionForeground = getSelectionForeground(project.theme)

    return (
        <div
            className="relative h-full min-h-0 min-w-0 overflow-hidden selection:bg-(--project-theme) selection:text-(--project-selection-foreground)!"
            style={{
                "--project-theme": project.theme,
                "--project-selection-foreground": selectionForeground,
            } as React.CSSProperties}
        >
            <Tabs
                value={tabName}
                onValueChange={(value) => router.push(`/projects/${projectId}?tab=${value}`)}
                className="h-full min-h-0 w-full"
            >
                <TabsList className="ml-auto right-0 z-30 fixed top-(--header-height)">
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

                <TabsContent value="settings" className="min-h-0 overflow-hidden">
                    <ProjectSettings projectId={projectId} />
                </TabsContent>
            </Tabs>
        </div>
    )
}