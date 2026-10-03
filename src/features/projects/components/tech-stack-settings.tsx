import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";

export default function TechStackSettings({ projectId }: { projectId: string }) {
    return (
        <Card id="tech-stack" className="rounded-none">
            <CardHeader>
                <h3 className="text-2xl font-bold">Tech Stack</h3>
            </CardHeader>
            <CardDescription>
                <p>Manage the technologies used in this project.</p>
            </CardDescription>
            <CardContent>
                <p>Tech stack information will be displayed here.</p>
            </CardContent>
            <CardFooter className="justify-end rounded-none">
                <Button variant="destructive">Update Tech Stack</Button>
            </CardFooter>
        </Card>
    )
}