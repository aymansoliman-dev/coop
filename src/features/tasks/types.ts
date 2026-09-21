export type Task = {
    id: string;
    title: string;
    description?: string;
    status: 'backlog' | 'pending' | 'in progress' | 'in review' | 'done';
    createdAt: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
}