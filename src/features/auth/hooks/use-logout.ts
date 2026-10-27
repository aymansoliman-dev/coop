"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return () => {
    localStorage.removeItem("token") // use whatever key you store it under
    queryClient.clear()              // drop the previous user's cached data
    router.replace("/login")
  }
}