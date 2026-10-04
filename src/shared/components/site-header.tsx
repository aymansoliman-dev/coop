"use client"

import { Separator } from "@/shared/components/ui/separator"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import Image from "next/image"
import { useHeaderTitle } from "@/shared/hooks/useHeaderTitle"
import { Button } from "@/shared/components/ui/button"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const title = useHeaderTitle()

    const _currentProjectId = usePathname().match(/^\/projects\/([^/]+)/)?.[1]
    

    return (
        <header className="sticky top-0 z-20 h-(--header-height) shrink-0 items-center border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex">
            <SidebarTrigger className="aspect-square p-6" style={{ borderRight: "1px solid var(--border)" }} />

            {/* <Separator
                orientation="vertical"
                className="mx-2 h-12 data-vertical:self-auto"
            /> */}
            
            <Button variant="ghost" className="h-full pl-4 pr-6" style={{ borderRight: "1px solid var(--border)" }} >
                {title}
            </Button>

            <Image
                src={'https://res.cloudinary.com/dxlofja7z/image/upload/v1789662878/coop_dhxvx8.svg'}
                alt="coop logo"
                width={16}
                height={16}
                className="ml-auto mr-4"
            />
        </header>
    )
}
