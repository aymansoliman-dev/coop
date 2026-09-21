export function avatarFallbackText(name: string | undefined): string {
    if (!name) return "00"
    return name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
}