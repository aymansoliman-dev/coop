import { useQuery } from '@tanstack/react-query';
import { fetchProjectStack } from '@/features/stack/api';
import { useParams } from 'next/navigation';

export function useProjectStack() {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const { projectId } = useParams()
  
  return useQuery({
    queryKey: ['projects', projectId, 'stack'], // Must match the list query key exactly
    queryFn: () => fetchProjectStack(projectId as string), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}