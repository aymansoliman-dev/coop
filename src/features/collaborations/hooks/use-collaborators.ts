import { useQuery } from '@tanstack/react-query';
import { fetchCollaborators } from '@/features/collaborations/api';
import { useParams } from 'next/navigation';

export function useProjectCollaborators() {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  const { projectId } = useParams()
  
  return useQuery({
    queryKey: ['projects', projectId, 'collaborators'],                   // Must match the list query key exactly
    queryFn: () => fetchCollaborators(projectId as string), // Keeps fallback capability if page is refreshed directly
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken && !!projectId,
  });
}