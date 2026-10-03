import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";

export default function DangerZoneSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="danger-zone" className="rounded-none">
            <CardHeader>
                <h3 className="text-2xl font-bold">Danger Zone</h3>
            </CardHeader>
            <CardDescription>
                <p>Delete this project and all of its data.</p>
            </CardDescription>
            <CardContent>
                <p>This action cannot be undone.</p>
            </CardContent>
            <CardFooter className="justify-end rounded-none">
                <Button variant="destructive">Delete Project</Button>
            </CardFooter>
        </Card>
    )
}