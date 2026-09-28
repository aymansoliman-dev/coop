import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatarFallbackText(name: string | undefined): string {
    if (!name) return "00"
    return name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
}