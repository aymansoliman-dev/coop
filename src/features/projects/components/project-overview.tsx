import { BoxIcon } from 'lucide-react'
import { useProject } from '@/features/projects/hooks/useProject'
import { ProjectStatement } from '@/features/projects/components/project-statement'
import { ProjectCollaborators } from '@/features/collaborations/components/project-collaborators'
import { ProjectStack } from '@/features/stack/components/project-stack'
import { TasksTable } from '@/features/tasks/components/tasks-table'
import Image from 'next/image'


export default function ProjectOverview({ projectId }: { projectId: string }) {

    const { data: project = {}, isPending } = useProject(projectId)

    return (
        <>
            <div className="relative z-20 flex items-center gap-4 p-8">
                <div className="w-32 aspect-square overflow-hidden rounded-2xl">
                    {
                        isPending ?
                            <div className="w-full h-full relative flex size-10 items-center justify-center overflow-hidden rounded-md bg-muted">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
                            </div>
                            : project.logo ? <Image quality={100} src={project.logo} alt={project.name + ' logo'} className="h-full w-full object-cover object-center" width={48} height={48} unoptimized />
                                : <BoxIcon color={project.theme} fill={project.theme} size="full" />
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-5xl font-bold">{project.name}</h2>
                    <ProjectStack projectId={projectId} />
                </div>
            </div>
            <ProjectCollaborators projectId={projectId} />
            <ProjectStatement statement={project.project_statement} />
            <TasksTable projectId={projectId} />
        </>
    )
}