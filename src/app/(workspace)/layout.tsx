import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { SiteHeader } from "@/shared/components/site-header";
import { WorkspaceBall } from "@/shared/components/workspace-ball";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            className="grid! h-dvh w-dvw min-h-0 min-w-0 grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] overflow-hidden"
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 64)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <div className="row-span-2 min-h-0">
                <AppSidebar variant="inset" />
            </div>

            <SiteHeader />

            <SidebarInset className="grid! min-h-0 min-w-0 overflow-hidden">
                <div className="relative min-h-0 min-w-0 overflow-hidden">
                    <WorkspaceBall />
                    <div className="relative z-10 min-h-0 min-w-0 h-full overflow-auto">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
