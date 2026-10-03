import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";

export default function CollaboratorsSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="project-collaborators" className="rounded-none">
            <CardHeader>
                <h3 className="text-2xl font-bold">Collaborators</h3>
            </CardHeader>
            <CardDescription>
                <p>Manage who can work on this project.</p>
            </CardDescription>
            <CardContent>
                <p>Collaborators can view and edit this project.</p>
            </CardContent>
            <CardFooter className="justify-end rounded-none">
                <Button variant="destructive">Delete Project</Button>
            </CardFooter>
        </Card>
    )
}