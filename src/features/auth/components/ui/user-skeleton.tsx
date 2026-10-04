import { Skeleton } from "@/shared/components/ui/skeleton"

export function UserSkeleton() {
  return (
    <div className="ml-auto h-full aspect-square border-l">
      <Skeleton className="h-full w-full" />
    </div>
  )
}