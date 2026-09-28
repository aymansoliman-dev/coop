import { Skeleton } from "@/shared/components/ui/skeleton"

export function UserSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-45" />
        <Skeleton className="h-2.5 w-25" />
      </div>
    </div>
  )
}