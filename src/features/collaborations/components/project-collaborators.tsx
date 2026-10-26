import { useProjectCollaborators } from '@/features/collaborations/hooks/use-collaborators'
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar'
import { avatarFallbackText } from '@/shared/lib/utils'

export function ProjectCollaborators () {
    const { data: collaborators = [] } = useProjectCollaborators()

    if (!collaborators || collaborators.length === 0) return null

    return (
        <div className="ml-auto">
            <AvatarGroup className="flex gap-2 items-center">
                {
                    collaborators.map((collaborator: { id: string, name: string, avatar: string }) => (
                        <Avatar key={collaborator.id} className="rounded-none! border-none">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>{avatarFallbackText(collaborator.name)}</AvatarFallback>
                        </Avatar>
                    ))
                }
            </AvatarGroup>
        </div>
    )
}