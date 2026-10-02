import { useProject } from "../hooks/useProject"

export default function ProjectSettings({ projectId }: { projectId: string }) {
    const { data: project = {}, isPending } = useProject(projectId)

    return (
        <h1 className="text-2xl font-bold">Project Settings</h1>
    )
}