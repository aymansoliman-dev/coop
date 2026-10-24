import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/features/tasks/api';
import { useRef } from 'react';
import { toast } from '@/shared/components/ui/toast';
import { useParams } from 'next/navigation';

export function useDeleteTask() {
  const toastIdRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Deleting task...',
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });

      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Task Deleted!',
        })
      }
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to delete task. Please try again.',
        })
      }
    },
    retry: false,
  });
}