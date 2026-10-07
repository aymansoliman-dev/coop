import { useQuery } from '@tanstack/react-query';
import { fetchStackCatalog } from '@/features/stack/api';

export function useStackCatalog() {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  return useQuery({
    queryKey: ['stack-catalog'],
    queryFn: () => fetchStackCatalog(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: false,
    enabled: hasToken,
  });
}