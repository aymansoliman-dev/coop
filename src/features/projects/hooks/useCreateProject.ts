import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewProject } from '@/features/projects/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'

export function useCreateProject() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: (newProject: { name: string, privacy: string, logo: File | null, project_statement: string | null }) => createNewProject(newProject),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Creating project...',
      })
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects-list'] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project created!',
        })
      }
      router.push('/projects/' + newProject.id)
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to create project. Please try again.',
        })
      }
    },
    retry: false,
  })
}