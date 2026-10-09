"use client"

import { cn } from "cn"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Spinner } from '@/shared/components/ui/spinner'
import { type ComponentProps, useEffect, useState } from 'react'
import Image from 'next/image'
import coop from '@/../public/coop.svg'
import { useRouter } from 'next/navigation'
import { useSignup } from '@/features/auth/hooks/use-signup'
import { CheckCircle2, EyeClosedIcon, EyeIcon, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group"
import { useForm } from "react-hook-form"
import { checkUsername, type SignupData } from "@/features/auth/api"

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValidating, touchedFields },
  } = useForm<SignupData>({
    mode: "onChange",
  })
  const username = watch("username")
  const usernameHasValidFormat = /^[a-z0-9_-]{3,20}$/.test(username ?? "")
  const showUsernameStatus = Boolean(username && touchedFields.username)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const { mutate, isPending } = useSignup()

  function onSubmit(data: SignupData) {
    mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-8 items-center justify-center">
            <Image src={coop} alt="coop" />
          </div>
          <span className="sr-only">coop</span>
          <h1 className="text-xl font-bold">coop</h1>
          <p className="text-muted-foreground text-sm">Already have an account? <Link href="/login">Log in</Link></p>
        </div>
        <FieldGroup>
          <Field className="flex-row gap-0 border">
            <FieldLabel htmlFor="name" className="w-21! shrink-0 px-2 border-r text-muted-foreground text-nowrap">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John"
              className={cn("border-none", errors.name && "border-destructive ring-2 ring-destructive/20")}
              aria-invalid={!!errors.name}
              disabled={isPending}
              minLength={2}
              required
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
            />
          </Field>
        </FieldGroup>
        <FieldGroup className="gap-4">
          <Field className="flex-row gap-0 border">
            <FieldLabel htmlFor="email" className="w-21! shrink-0 px-2 border-r text-muted-foreground">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className={cn("border-none", errors.email && "border-destructive ring-2 ring-destructive/20")}
              aria-invalid={!!errors.email}
              disabled={isPending}
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </Field>
          <Field className="flex-row gap-0 border">
            <FieldLabel htmlFor="username" className="w-21! shrink-0 px-2 border-r text-muted-foreground">Username</FieldLabel>
            <InputGroup className="h-10 focus-within:ring-0">
              <InputGroupAddon align="inline-start">
                <span className="w-fit! flex items-center justify-center text-muted-foreground bg-none">@</span>
              </InputGroupAddon>
              <InputGroupInput
                id="username"
                type="text"
                placeholder="john_doe"
                className={cn("border-none", errors.username && "border-destructive")}
                disabled={isPending}
                required
                aria-invalid={!!errors.username}
                {...register("username", {
                  required: "Username is required",
                  validate: async (value) => {
                    if (!/^[a-z0-9_-]{3,20}$/.test(value)) return "3-20 chars: a-z, 0-9, _ or -"
                    const { available } = await checkUsername(value)
                    return available || "That username is taken"
                  },
                })}
              />
              {showUsernameStatus && (
                <InputGroupAddon align="inline-end" aria-label={isValidating ? "Checking username" : errors.username ? "Username is unavailable" : usernameHasValidFormat ? "Username is available" : "Username is invalid"}>
                  {isValidating ? (
                    <Loader2 className="animate-spin text-muted-foreground" />
                  ) : errors.username || !usernameHasValidFormat ? (
                    <XCircle className="text-destructive" />
                  ) : (
                    <CheckCircle2 className="text-green-500" />
                  )}
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
          <Field className="flex-row gap-0 border">
            <FieldLabel htmlFor="password" className="w-21! shrink-0 text-muted-foreground px-2 border-r">Password</FieldLabel>
            <div className="flex">
              <Input
                id="password"
                type={passwordIsVisible ? "text" : "password"}
                placeholder="8 characters min."
                className={cn("border-r z-10", errors.password && "border-destructive ring-2 ring-destructive/20")}
                disabled={isPending}
                required
                aria-invalid={!!errors.password}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <Button type="button" variant="secondary" onClick={() => setPasswordIsVisible(!passwordIsVisible)} className="border-none h-full aspect-square py-[.7rem]" disabled={isPending}>
                {passwordIsVisible ? <EyeIcon /> : <EyeClosedIcon />}
              </Button>
            </div>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={isPending} className="h-10">
              { isPending ? <Spinner color="black" /> : <span>Sign up</span> }
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <div className="flex flex-col md:flex-row gap-4">
            <Field>
              <Button variant="outline" type="button" disabled={isPending}>
                <svg fill="#ffffff" viewBox="-2.5 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg size-5">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"/>
                </svg>
                Continue with GitHub
              </Button>
            </Field>
            <Field>
              <Button variant="outline" type="button" disabled={isPending}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
                </svg>
                Continue with Google
              </Button>
            </Field>
          </div>
        </FieldGroup>
      </form>
      <p className="px-6 text-center text-muted-foreground text-sm">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  )
}
