import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { useNotifications } from "@/features/notifications/hooks/use-notifications"
import { NotificationsIcon } from "@/assets/icons"
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

type Notification = {
	id: string,
	message: string,
	actor: string,
	receiver: string,
	createdAt: string,
	read: boolean,
}

export function NotificationsBox() {
	const [open, setOpen] = useState(false)
	const { data: notifications = [] } = useNotifications()

	return (
		<div className="h-full aspect-square border-l">  
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger className="p-0 h-full w-full flex items-center justify-center" render={
					<Button variant="ghost" className="p-0">
						<NotificationsIcon hasNew={notifications.some((n: Notification) => !n.read)} filled={open} />
					</Button>
				}>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="min-w-56"
					side="bottom"
					align="end"
					sideOffset={1}
					>
					<DropdownMenuGroup>
						{
							notifications.length === 0 ? (
								<div className="px-4 py-2 text-sm text-muted-foreground">
									No notifications
								</div>
							) : (
								notifications.map((notification: Notification) => (
									<div key={notification.id} className="px-4 py-2 text-sm text-muted-foreground">
										{notification.message}
									</div>
								))
							)
						}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}