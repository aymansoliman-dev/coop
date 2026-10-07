import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectStack } from '@/features/stack/api'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'
import type { StackItem } from '@/features/stack/types'

type UpdateProjectVariables = {
  projectId: string
  updates: StackItem[]
}

export function useUpdateProjectStack() {
  const queryClient = useQueryClient()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: ({ projectId, updates }: UpdateProjectVariables) => updateProjectStack(projectId, updates),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Updating project.stack..',
      })
    },
    onSuccess: (data, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'stack'] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project stack updated!',
        })
      }
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to update project stack. Please try again.',
        })
      }
    },
    retry: false,
  })
}