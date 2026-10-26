"use client"

import { useMe } from "@/features/auth/hooks/use-me"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  // const { data: me, isPending } = useMe()

  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/dashboard")
  }, [router])

  // // Avoid flashing the form for users who are about to be redirected
  // if (isPending) return null // or a spinner
  // else if (me) router.replace("/dashboard")
  
  return (
    <>
      {children}
    </>
  )
}