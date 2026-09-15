import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/features/projects/api';

// 2. Add the new single project hook
export function useProject(projectId: string) {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  return useQuery({
    queryKey: ['projects'], // Must match the list query key exactly
    queryFn: fetchProjects, // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
    // 💡 Select extracts the specific item from the cached array
    select: (projects) => projects?.find((p: any) => p.id === projectId),
  });
}