"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import coop from "../../public/coop.svg"
import { useHeaderTitle } from "@/hooks/useHeaderTitle"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

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
                    src={coop}
                    alt="coop logo"
                    width={16}
                    height={16}
                    className="ml-auto"
                />

            </div>
        </header>
    )
}
