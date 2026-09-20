'use client';

import { useSearchParams } from "next/navigation"
import Image from 'next/image';
import { BoxIcon } from 'lucide-react';
import { useProject } from "@/features/projects/hooks/useProject";
import { DataTable } from "@/shared/components/data-table";

export default function Project() {
    const projectId: string | null = useSearchParams().get('id')
    const { data: project } = useProject(projectId!)

    if (!project || !projectId) return null

    return (
        <div className="relative">
            <span style={{ background: project.theme }} className={`ball absolute w-lg aspect-square rounded-full right-0 -top-8 opacity-15 blur-[640rem]`}></span>
            <div className="relative z-20 flex items-center gap-4 p-6">
                <div className="w-32 aspect-square">
                    { project.logo ? <Image src={project.log} alt={project.name} className="w-full" /> : <BoxIcon color={project.theme} fill={project.theme} size="full" />}
                </div>
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    <ul className="flex items-center gap-2">
                        {
                            project.stacks.map((stack: { id: string, name: string, icon: string }) => (
                                <li key={stack.id}>
                                    <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.icon}/${stack.icon}-original.svg`} alt={stack.name} width={24} height={24} loading="lazy" />
                                </li>) 
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="px-6">
                <ul className="flex gap-2 items-center">
                    {
                        project.collaborators.map((collaborator: { id: string, name: string, avatar: string }) => (
                            <li key={collaborator.id}>
                                {collaborator.name}
                            </li>)
                        )
                    }
                </ul>
            </div>

            <p className="mt-6 text-foreground px-6">{project.project_statement}.</p>
            <div className="mt-6">
                {/* <ul className="flex flex-col gap-2">
                    {
                        project.tasks.map((task: { id: string, name: string, description: string }) => (
                            <li key={task.id} className="flex flex-col gap-1">
                                <h3 className="font-semibold">{task.name}</h3>
                                <p className="text-sm text-foreground/70">{task.description}</p>
                            </li>)
                        )
                    }
                </ul> */}
                <DataTable data={project.tasks} />
            </div>
        </div>
    )
}