"use client"

import { usePathname } from "next/navigation"
import { useProject } from "@/features/projects/hooks/useProject"

const dashboardColor = "#00DBF3"

export function WorkspaceBall() {
  const pathname = usePathname()
  const projectId = pathname.match(/^\/projects\/([^/]+)/)?.[1] ?? ""
  const theme = useProject(projectId).data?.theme

  return (
    <div
      aria-hidden="true"
      className="ball pointer-events-none absolute right-0 -top-8 z-0 aspect-square w-lg rounded-full opacity-15 blur-[640rem] transition-[background-color] duration-500"
      style={{ backgroundColor: theme ?? dashboardColor }}
    />
  )
}