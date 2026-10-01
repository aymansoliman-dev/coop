import Image from 'next/image'
import { useProjectStack } from '@/features/stack/hooks/useProjectStack'

export function ProjectStack({ projectId }: { projectId: string }) {
    const { data: stack = [] } = useProjectStack(projectId)

    return (
        <ul className="flex items-center gap-2">
            {
                stack.map((s: { id: string, name: string, icon: string }) => (
                    <li key={s.id}>
                        <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}/${s.icon}-original.svg`} alt={s.name} width={24} height={24} loading="lazy" />
                    </li>) 
                )
            }
        </ul>
    )
}