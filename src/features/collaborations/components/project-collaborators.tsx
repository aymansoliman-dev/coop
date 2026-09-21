import { useSearchParams } from 'next/navigation'
import { useProjectCollaborators } from '@/features/collaborations/hooks/useCollaborators'
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar'
import { avatarFallbackText } from '@/shared/utils'

export function ProjectCollaborators () {
    const projectId = useSearchParams().get('id') || ''
    const { data: collaborators = [] } = useProjectCollaborators(projectId)

    return (
        <div className="px-6">
            <AvatarGroup className="flex gap-2 items-center">
                {
                    collaborators.map((collaborator: { id: string, name: string, avatar: string }) => (
                        <Avatar key={collaborator.id}>
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>{avatarFallbackText(collaborator.name)}</AvatarFallback>
                        </Avatar>
                    ))
                }
            </AvatarGroup>
        </div>
    )
}