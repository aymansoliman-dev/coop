import Link from "next/link"
import GeneralSettings from "@/features/projects/components/general-settings"
import TechStackSettings from "@/features/projects/components/tech-stack-settings"
import CollaboratorsSettings from "@/features/projects/components/collaborators-settings"
import DangerZoneSettings from "@/features/projects/components/danger-zone-settings"
import { Button } from "@/shared/components/ui/button"
import { SettingsIcon } from "lucide-react"

export default function ProjectSettings({ projectId }: { projectId: string }) {
    return (
        <div className="bg-background flex flex-col gap-12 [&>div]:px-4 [&>div]:lg:px-8">
            <div className="border-b py-8 sticky top-(--header-height) bg-background">
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">Project Settings</h3>
                    <SettingsIcon />
                </div>
                <p className="text-muted-foreground">Manage how this project looks, who can work on it, and what it is built with.</p>
            </div>
            <div className="flex gap-8">
                <aside className="flex flex-col gap-2 w-48 shrink-0">
                    <Button nativeButton={false} variant="ghost" className="justify-start" render={
                        <Link href="#general">General</Link>
                    } />
                    <Button nativeButton={false} variant="ghost" className="justify-start" render={
                        <Link href="#tech-stack">Tech stack</Link>
                    } />
                    <Button nativeButton={false} variant="ghost" className="justify-start" render={
                        <Link href="#project-collaborators">Collaborators</Link>
                    } />
                    <Button nativeButton={false} variant="ghost" className="justify-start" render={
                        <Link href="#danger-zone">Danger zone</Link>
                    } />
                </aside>
                <div className="grow flex flex-col gap-8">
                    <GeneralSettings         projectId={projectId} />
                    <TechStackSettings       projectId={projectId} />
                    <CollaboratorsSettings   projectId={projectId} />
                    <DangerZoneSettings      projectId={projectId} />
                </div>
            </div>
        </div>
    )
}