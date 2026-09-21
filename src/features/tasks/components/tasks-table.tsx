import { useSearchParams } from 'next/navigation'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { DataTable } from '@/shared/components/data-table'
import type { Task } from '@/features/tasks/types'

export function TasksTable() {
    const projectId: string | null = useSearchParams().get('id')
    const { data: tasks = [] } = useTasks(projectId!)
    
    return (
        <div className="mt-6">
            <DataTable
                data={tasks.map((task: Task) => ({
                    id: task.id,
                    header: task.title,
                    status: task.status,
                    target: "—",
                    limit: "—",
                    reviewer: "—",
                }))}
            />
        </div>
    )
}