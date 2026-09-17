import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from '@/features/projects/api';

export function useProject(projectId: string) {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  return useQuery({
    queryKey: ['projects', projectId], // Must match the list query key exactly
    queryFn: () => fetchProjectById(projectId), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}