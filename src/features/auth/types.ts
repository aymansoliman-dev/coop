export type User = {
    id: string
    name: string
    username: string
    email: string
    role: string
    country: string | null
    avatar: string | null
    bio: string | null
    score: number
    private: boolean
    profile_theme: string
    created_at: string // timestamp
}