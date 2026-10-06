import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatarFallbackText(name: string | undefined): string {
    if (!name) return "00"
    return name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
}

export function getSelectionForeground(color: string | undefined) {
    if (!color) return '#ffffff'

    const hex = color.replace('#', '')
    if (!/^[0-9a-f]{8}$/i.test(hex)) return '#ffffff'

    const opacity = parseInt(hex.slice(6, 8), 16) / 255
    const channels = [0, 2, 4].map((index) => {
        const channel = parseInt(hex.slice(index, index + 2), 16)
        return (channel * opacity + 255 * (1 - opacity)) / 255
    })
    const luminance = channels
        .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
        .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0)

    return luminance > 0.179 ? '#000000' : '#ffffff'
}