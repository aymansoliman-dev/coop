import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject } from '@/features/projects/api'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'
import type { Project } from '@/features/projects/types'

export function useDeleteProject() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const toastIdRef = useRef<string | null>(null)
  const pathname = usePathname()

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Deleting project...',
      })
    },
    onSuccess: (_data, projectId) => {
      queryClient.setQueryData<Project[]>(['projects-list'], (projects = []) => {
        return projects.filter((project) => project.id !== projectId)
      })
      queryClient.removeQueries({ queryKey: ['projects', projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects-list'] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project Deleted!',
        })
      }
      if (pathname === `/projects/${projectId}`) router.push('/dashboard')
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