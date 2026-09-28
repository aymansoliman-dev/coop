import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject } from '@/features/projects/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'

export function useDeleteProject() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Deleting project...',
      })
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects-list'] })
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project Deleted!',
        })
      }
      router.push('/dashboard')
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to delete project. Please try again.',
        })
      }
    },
    retry: false,
  })
}