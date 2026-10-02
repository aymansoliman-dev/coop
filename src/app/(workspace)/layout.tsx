import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { SiteHeader } from "@/shared/components/site-header";
import { WorkspaceBall } from "@/shared/components/workspace-ball";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader />
                <div className="relative flex min-h-0 flex-1 flex-col">
                    <WorkspaceBall />
                    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
