import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/features/projects/api';

export function useProjects() {

  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,            // Your API fetch logic
    staleTime: Infinity,               // Treat data as fresh permanently during the session
    gcTime: 1000 * 60 * 60,            // Cache in memory for 1 hour
    retry: false,                      // Don't spam the login endpoint if unauthenticated
    enabled: hasToken,                 // 💡 Only fetches if a token actually exists 
  });
}
