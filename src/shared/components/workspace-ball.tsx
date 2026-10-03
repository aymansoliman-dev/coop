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
      className="pointer-events-none absolute inset-0 z-0 hidden"
      style={{ backgroundColor: theme ?? dashboardColor }}
    />
  )
}