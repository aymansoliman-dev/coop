import Image from 'next/image'
import { useProjectStack } from '@/features/stack/hooks/useProjectStack'
import type { ProjectStackItem } from '@/features/stack/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'

function getDeviconUrl(name: string) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`
}

export function ProjectStack() {
    const { data: stack = [] } = useProjectStack()

    return (
        <ul className="flex items-center gap-2 select-none">
            {
                stack.map((s: ProjectStackItem) => (
                    <li key={s.id}>
                        <Image
                            src={getDeviconUrl(s.name)}
                            alt={s.name}
                            width={24}
                            height={24}
                            loading="lazy"
                            unoptimized
                        />    
                    </li>) 
                )
            }
        </ul>
    )
}