import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewProject } from '@/features/projects/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'
import type { Project } from '@/features/projects/types'

export function useCreateProject() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: (newProject: { name: string, privacy: string, logo: File | null, statement: string | null }) => createNewProject(newProject),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Creating project...',
      })
    },
    onSuccess: (newProject: Project) => {
      queryClient.setQueryData(['projects', newProject.id], newProject)
      queryClient.setQueryData<Project[]>(['projects-list'], (projects = []) => {
        return [newProject, ...projects]
      })
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