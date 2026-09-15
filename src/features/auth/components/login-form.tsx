"use client"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner'
import { type ComponentProps, useEffect, useState } from 'react' // 💡 Removed useRef
import Image from 'next/image'
import coop from '@/../public/coop.svg'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/toast'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from '@/features/auth/api'
import { EyeClosedIcon, EyeIcon } from "lucide-react"

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.invalidateQueries({ queryKey: ['authUser'] }) 

      toast.add({
        type: "success",
        description: "Logged in successfully",
      })
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error(error)
      toast.add({
        type: 'error',
        description: error.message || "Something went wrong. Please try again.",
      })
    }
  })

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    loginMutation.mutate({ email, password })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Image src={coop} alt="coop" />
            </div>
            <span className="sr-only">coop</span>
            <h1 className="text-xl font-bold">coop</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email" // 💡 Required for FormData to target this input
              type="email"
              placeholder="m@example.com"
              disabled={loginMutation.isPending}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="flex gap-1">
              <Input
                id="password"
                name="password" // 💡 Required for FormData to target this input
                type={ passwordIsVisible? "text": "password" }
                placeholder="password"
                disabled={loginMutation.isPending}
                required
              />
              <Button variant="secondary" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                { passwordIsVisible ? <EyeIcon /> : <EyeClosedIcon /> }
              </Button>
            </div>
          </Field>
          <Field>
            <Button type="submit" disabled={loginMutation.isPending}>
              { loginMutation.isPending ? <Spinner color="black" /> : <span>Log in</span> }
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" disabled={loginMutation.isPending}>
              <svg fill="#ffffff" viewBox="-2.5 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg size-5">
                <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"/>
              </svg>
              Continue with GitHub
            </Button>
            <Button variant="outline" type="button" disabled={loginMutation.isPending}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
