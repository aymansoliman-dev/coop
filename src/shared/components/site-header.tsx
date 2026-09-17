"use client"

import { Separator } from "@/shared/components/ui/separator"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import Image from "next/image"
import { useHeaderTitle } from "@/shared/hooks/useHeaderTitle"
import { useSearchParams } from "next/navigation"
import { Button } from "@/shared/components/ui/button"

export function SiteHeader() {
    const title = useHeaderTitle()
    const currentProjectId = useSearchParams().get('id')
    

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />

                <Separator
                    orientation="vertical"
                    className="mx-2 h-4 data-vertical:self-auto"
                />
                
                <Button variant="ghost">
                    {title}
                </Button>

                <Image
                    src={'https://res.cloudinary.com/dxlofja7z/image/upload/v1789662878/coop_dhxvx8.svg'}
                    alt="coop logo"
                    width={16}
                    height={16}
                    className="ml-auto"
                />

            </div>
        </header>
    )
}
