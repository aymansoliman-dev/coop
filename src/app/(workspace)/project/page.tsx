'use client';

import   Image                  from 'next/image'
import { useSearchParams      } from 'next/navigation'
import { BoxIcon              } from 'lucide-react'
import { useProject           } from '@/features/projects/hooks/useProject'
import { ProjectStatement     } from '@/features/projects/components/project-statement'
import { ProjectCollaborators } from '@/features/collaborations/components/project-collaborators'
import { ProjectStack         } from '@/features/stack/components/project-stack'
import { TasksTable           } from '@/features/tasks/components/tasks-table'

export default function Project() {
    const projectId: string | null = useSearchParams().get('id')
    const { data: project = {} } = useProject(projectId!)

    if (!project || !projectId) return null

    return (
        <div className="relative">
            <span style={{ background: project.theme }} className={`ball absolute w-lg aspect-square rounded-full right-0 -top-8 opacity-15 blur-[640rem]`}></span>
            <div className="relative z-20 flex items-center gap-4 p-6">
                <div className="w-32 aspect-square">
                    { project.logo ? <Image src={project.logo} alt={project.name} className="w-full" width={48} height={48} /> : <BoxIcon color={project.theme} fill={project.theme} size="full" />}
                </div>
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    <ProjectStack />
                </div>
            </div>
            <ProjectCollaborators />
            <ProjectStatement statement={project.project_statement} />
            <TasksTable />
        </div>
    )
}