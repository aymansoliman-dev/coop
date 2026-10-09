import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { toast } from '@/shared/components/ui/toast'
import { useRef } from 'react'


export function useSignup() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const toastIdRef = useRef<string | null>(null)

    return useMutation({
        mutationFn: signup,
        onMutate: () => {
            toastIdRef.current = toast.add({
                type: 'loading',
                description: 'Creating your account...',
            })
        },
        onError: (error: any) => {
            if (toastIdRef.current !== null) {
                toast.update(toastIdRef.current, {
                    type: 'error',
                    description: error.message || 'Failed to create your account. Please try again.',
                })
            }
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            if (data.user) {
                queryClient.setQueryData(['authUser'], data.user)
            } else {
                queryClient.invalidateQueries({ queryKey: ['authUser'] })
            }

            toast.update(toastIdRef.current!, {
                type: "success",
                description: "Great to have you here",
            })
            router.push('/dashboard')
        }
    })
}