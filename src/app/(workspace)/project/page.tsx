'use client';

import { useSearchParams } from "next/navigation"
import Image from 'next/image';
import { BoxIcon } from 'lucide-react';
import { useProject } from "@/features/projects/hooks/useProject";

export default function Project() {
    const projectId: string | null = useSearchParams().get('id')
    const { data: project } = useProject(projectId!)

    if (!project || !projectId) return null

    return (
        <div className="relative p-6">
            <span style={{ background: project.theme }} className={`ball absolute w-lg aspect-square rounded-full right-0 -top-8 opacity-15 blur-[640rem]`}></span>
            <div className="relative z-20 flex items-center gap-4">
                <div className="w-32 aspect-square">
                    { project.logo ? <Image src={project.log} alt={project.name} className="w-full" /> : <BoxIcon color={project.theme} fill={project.theme} size="full" />}
                </div>
                <div className="flex flex-col gap-4 ">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    {/* <ul className="flex items-center gap-2">
                        {
                            project.stack.map((s: { id: string, name: string, icon: string }) => (
                                <li key={s.id}>
                                    <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}/${s.icon}-original.svg`} alt={s.name} width={24} height={24} loading="lazy" />
                                </li>) 
                            )
                        }
                    </ul> */}
                </div>
            </div>
            <p className="mt-6 text-foreground">{project.project_statement}.</p>
        </div>
    )
}