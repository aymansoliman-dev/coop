import { useProjectCollaborators } from '@/features/collaborations/hooks/useCollaborators'
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar'
import { avatarFallbackText } from '@/shared/lib/utils'

export function ProjectCollaborators ({ projectId }: { projectId: string }) {
    const { data: collaborators = [] } = useProjectCollaborators(projectId)

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