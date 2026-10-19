import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "@/features/notifications/api"
import { useAuthUser } from "@/features/auth/hooks/useAuthUser"

export function useNotifications() {
    const hasToken =
        typeof window !== "undefined" && !!localStorage.getItem("token")
    const { data: authUser } = useAuthUser()

    return useQuery({
        queryKey: [authUser?.id, "notifications"],
        queryFn: getNotifications,
        enabled: hasToken,

    })
}