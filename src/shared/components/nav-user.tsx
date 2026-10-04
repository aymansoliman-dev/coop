"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { CircleUserRoundIcon, CreditCardIcon, BellIcon } from "lucide-react"
import { LogoutIcon } from "@/assets/icons"
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/shared/components/ui/toast";
import { useAuthUser } from "@/features/auth/hooks/useAuthUser"
import { avatarFallbackText } from "@/shared/lib/utils"
import { UserSkeleton } from "@/features/auth/components/ui/user-skeleton"

export function NavUser() {
  const router = useRouter();
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token")
    router.push("/login")
    toast.add({
      type: "success",
      description: "logged out successfully",
    })
  }, [router])

  const { data: user, isPending } = useAuthUser()

  if (isPending) return <UserSkeleton />

  if (!user) return null

  return (
    <div className="ml-auto h-full aspect-square border-l">  
      <DropdownMenu>
        <DropdownMenuTrigger className="p-0 h-full w-full">
          <Avatar className="h-full w-full grayscale">
            { user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : <AvatarFallback>{avatarFallbackText(user.name)}</AvatarFallback>}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8">
                  { user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : <AvatarFallback className="rounded-lg">{avatarFallbackText(user.name)}</AvatarFallback>}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CircleUserRoundIcon
              />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon
              />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon
              />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogoutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
