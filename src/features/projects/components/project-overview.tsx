import { BoxIcon, BoxIconSkeleton } from '@/assets/icons'
import { useProject } from '@/features/projects/hooks/useProject'
import { ProjectStatement } from '@/features/projects/components/ui/project-statement'
import { ProjectCollaborators } from '@/features/collaborations/components/project-collaborators'
import { ProjectStack } from '@/features/stack/components/project-stack'
import { TasksTable } from '@/features/tasks/components/tasks-table'
import Image from 'next/image'
import { cn } from 'cn'


export default function ProjectOverview({ className }: { className?: string }) {

    const { data: project = {}, isPending } = useProject()

    return (
        <div className={cn(className, "flex flex-col h-full")}>
            <div className="relative z-20 flex items-center gap-4 py-8 px-4 lg:px-8">
                <div className="w-24 aspect-square overflow-hidden rounded-2xl select-none">
                    {
                        isPending ?
                            <BoxIconSkeleton size="full" className="text-muted-foreground/30" />
                            : project.logo ? <Image quality={100} src={project.logo} alt={project.name + ' logo'} className="h-full w-full object-cover object-center" width={32} height={32} unoptimized />
                                : <BoxIcon color={project.theme} fill={project.theme} size="full" />
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-5xl font-bold">{project.name}</h2>
                    <ProjectStack />
                </div>
            </div>
            <div className="flex border mx-4 lg:mx-8">
                <ProjectStatement statement={project.statement} />
                <ProjectCollaborators />
            </div>
            <TasksTable />
        </div>
    )
}