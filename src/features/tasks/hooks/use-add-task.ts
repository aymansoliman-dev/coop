import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '@/features/tasks/api';
import { useRef } from 'react';
import { toast } from '@/shared/components/ui/toast';
import { useParams } from 'next/navigation';

export function useAddTask() {
  const toastIdRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  
  return useMutation({
    mutationFn: ({projectId, taskData}: {projectId: string, taskData: any}) => addTask(projectId, taskData),
    onMutate: () => {
      toastIdRef.current = toast.add({
        type: 'loading',
        description: 'Adding new task...',
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'success',
          description: 'Task added!',
        })
      }
    },
    onError: (error: any) => {
      if (toastIdRef.current !== null) {
        toast.update(toastIdRef.current, {
          type: 'error',
          description: error.message || 'Failed to add task. Please try again.',
        })
      }
    },
    retry: false,
  });
}