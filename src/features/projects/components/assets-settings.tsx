import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export default function AssetsSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="assets" className="rounded-none py-0 block *:p-3 md:*:p-4">

            <CardHeader className="text-xl font-bold pt-0 pb-0.5! flex items-center gap-2 justify-between">
                <h4>Assets</h4>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground">Manage the assets for this project, including the logo and other media files.</p>
                    <p className="text-muted-foreground">This feature is currently under development.</p>
                </div>
            </CardContent>
        </Card>
    )
}