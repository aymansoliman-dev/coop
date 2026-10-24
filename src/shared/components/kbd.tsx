import { type RegisterableHotkey, useHotkey } from "@tanstack/react-hotkeys"
import { Kbd } from "./ui/kbd"

type KBDProps = Omit<React.ComponentPropsWithoutRef<typeof Kbd>, "children"> & {
  children: string
  action?: () => void
  enabled?: boolean
}

export function KBD({ children, className, action, enabled = true, ...props }: KBDProps) {
  const hotkey = children.replace(/\s+/g, "") as RegisterableHotkey

  useHotkey(hotkey, () => action?.(), {
    ignoreInputs: true,
    preventDefault: true,
    enabled: enabled && Boolean(action),
  })

  return (
    <Kbd className={className} {...props}>
      {children}
    </Kbd>
  )
}