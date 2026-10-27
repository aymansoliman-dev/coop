"use client";

import { useProject } from "@/features/projects/hooks/use-project";

const dashboardColor = "rgb(12, 108, 252)";

export function WorkspaceBall() {
  const theme = useProject().data?.theme;

  return (
    <div
      aria-hidden="true"
      className="ball pointer-events-none absolute right-0 -top-8 z-0 aspect-square w-lg rounded-full opacity-15 blur-[640rem] transition-[background-color] duration-500"
      style={{ backgroundColor: theme ?? dashboardColor }}
    />
  );
}
