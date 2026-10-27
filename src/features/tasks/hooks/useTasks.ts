import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/features/tasks/api';
import { useParams } from 'next/navigation';

export function useTasks() {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const { projectId } = useParams()
  
  return useQuery({
    queryKey: ['projects', projectId, 'tasks'],                   // Must match the list query key exactly
    queryFn: () => fetchTasks(projectId as string), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}