import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";

export default function CollaboratorsSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="project-collaborators" className="rounded-none">
            <CardHeader className="text-2xl font-bold">Collaborators</CardHeader>
            <CardDescription className="px-(--card-spacing)">Manage who can work on this project.</CardDescription>
            <CardContent>
                <p>Collaborators can view and edit this project.</p>
            </CardContent>
            <CardFooter className="justify-end rounded-none p-0">
                <Button variant="destructive">Delete Project</Button>
            </CardFooter>
        </Card>
    )
}