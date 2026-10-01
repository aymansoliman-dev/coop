import { useProject } from "../hooks/useProject"

export default function ProjectSettings({ proejctId }: { proejctId: string }) {
    const { data: project = {}, isPending } = useProject(proejctId)

    return (
        <h1 className="text-2xl font-bold">Project Settings</h1>
    )
}