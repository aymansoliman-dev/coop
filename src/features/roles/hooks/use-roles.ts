import { getRoles } from "@/features/roles/api"
import { useQuery } from "@tanstack/react-query"

export default function useRoles() {
    return useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
        staleTime: 1000 * 60 * 60, // 1 hour
        placeholderData: [],
    })
}