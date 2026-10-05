import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";

export default function TechStackSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="tech-stack" className="rounded-none">
            <CardHeader className="text-2xl font-bold">Tech Stack</CardHeader>
            <CardDescription className="px-(--card-spacing)">Manage the technologies used in this project.</CardDescription>
            <CardContent>
                Tech stack information will be displayed here.
            </CardContent>
            <CardFooter className="justify-end rounded-none p-0">
                <Button variant="destructive">Update Tech Stack</Button>
            </CardFooter>
        </Card>
    )
}