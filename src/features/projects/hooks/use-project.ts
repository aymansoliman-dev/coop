import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from '@/features/projects/api';
import { useParams } from 'next/navigation';

export function useProject() {
  const { projectId } = useParams()
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  return useQuery({
    queryKey: ['projects', projectId], // Must match the list query key exactly
    queryFn: () => fetchProjectById(projectId as string), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}