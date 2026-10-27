import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectStack } from '@/features/stack/api'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'
import type { StackItem } from '@/features/stack/types'
import { useParams } from 'next/navigation'

export function useUpdateProjectStack() {
  const { projectId } = useParams()
  const queryClient = useQueryClient()
  const toastIdRef = useRef<string | null>(null)

  return useMutation({
    mutationFn: ({ updates }: { updates: StackItem[] }) => updateProjectStack(projectId as string, updates),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Updating project.stack..',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'stack'] })
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Project stack updated!',
        })
      }
    },
    onError: (error: Error) => {
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