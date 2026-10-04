"use client"

import { NavUser } from "@/shared/components/nav-user"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import { useHeaderTitle } from "@/shared/hooks/useHeaderTitle"
import { Button } from "@/shared/components/ui/button"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const title = useHeaderTitle()

    const _currentProjectId = usePathname().match(/^\/projects\/([^/]+)/)?.[1]
    

    return (
        <header className="sticky top-0 z-20 h-(--header-height) shrink-0 items-center border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex">
            <SidebarTrigger className="aspect-square p-6" style={{ borderRight: "1px solid var(--border)" }} />
            
            <Button variant="ghost" className="h-full pl-4 pr-6" style={{ borderRight: "1px solid var(--border)" }} >
                {title}
            </Button>

            <NavUser />
        </header>
    )
}
