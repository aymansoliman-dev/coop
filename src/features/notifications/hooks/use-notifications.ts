import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "@/features/notifications/api"
import { useMe } from "@/features/auth/hooks/use-me"

export function useNotifications() {
    const hasToken =
        typeof window !== "undefined" && !!localStorage.getItem("token")
    const { data: me } = useMe()

    return useQuery({
        queryKey: [me?.id, "notifications"],
        queryFn: getNotifications,
        enabled: hasToken,

    })
}