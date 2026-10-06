import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/features/projects/api'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'
import type { Project, ProjectUpdate } from '@/features/projects/types'

type UpdateProjectVariables = {
  projectId: string
  updates: ProjectUpdate
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: ({ projectId, updates }: UpdateProjectVariables) => updateProject(projectId, updates),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Updating project...',
      })
    },
    onSuccess: (data, { projectId }) => {
      const updatedProject = data?.project

      if (updatedProject) {
        queryClient.setQueryData(['projects', projectId], updatedProject)
        queryClient.setQueryData<Project[]>(['projects-list'], (projects = []) => {
          return projects.map((project) =>
            project.id === projectId
              ? { ...project, ...updatedProject }
              : project
          )
        })
      }

      queryClient.invalidateQueries({ queryKey: ['projects-list'] })
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project Updated!',
        })
      }
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to update project. Please try again.',
        })
      }
    },
    retry: false,
  })
}