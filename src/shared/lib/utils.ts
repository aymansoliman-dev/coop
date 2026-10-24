import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatarFallbackText(name: string | undefined): string {
    if (!name) return "00"
    return name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
}

export function getSelectionForeground(color: string | undefined, background = '#ffffff') {
    const fg = parseHex(color)
    if (!fg) return '#ffffff'

    const bg = parseHex(background) ?? [255, 255, 255, 1]
    const [r, g, b] = [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]))

    const lin = (c: number) => {
        c /= 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    }
    const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

    return luminance > 0.179 ? '#000000' : '#ffffff'
}

function parseHex(color: string | undefined): [number, number, number, number] | null {
    if (!color) return null
    let hex = color.trim().replace('#', '')
    if (!/^([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex)) return null

    // expand shorthand (#abc / #abcd)
    if (hex.length <= 4) hex = [...hex].map((c) => c + c).join('')

    const n = (i: number) => parseInt(hex.slice(i, i + 2), 16)
    return [n(0), n(2), n(4), hex.length === 8 ? n(6) / 255 : 1]
}