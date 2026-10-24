import { useHotkey } from "@tanstack/react-hotkeys"
import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme

  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")

  // Load the stored value once on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored)
    }
  }, [])

  // Apply the theme, and follow the OS only while in "system" mode
  useEffect(() => {
    applyTheme(theme)

    if (theme !== "system") return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyTheme("system")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme])

  const setThemeAndStore = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useHotkey(
    "D",
    () => {
      const isDark = document.documentElement.classList.contains("dark")
      setThemeAndStore(isDark ? "light" : "dark")
    },
    { ignoreInputs: true }
  )

  return [theme, setThemeAndStore] as const
}