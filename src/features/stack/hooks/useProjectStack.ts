import { useQuery } from '@tanstack/react-query';
import { fetchProjectStack } from '@/features/stack/api';

export function useProjectStack(projectId: string) {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  return useQuery({
    queryKey: ['projects', projectId, 'stack'], // Must match the list query key exactly
    queryFn: () => fetchProjectStack(projectId), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}