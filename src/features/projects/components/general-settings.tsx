'use client'

import { useProject } from '@/features/projects/hooks/useProject'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter,
    CardHeader 
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { FieldGroup, Field } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'

const schema = z.object({
  name: z.string().min(1, "Required").max(50),
  project_statement: z.string().max(500),
  theme: z.string().regex(/^#[0-9A-Fa-f]{8}$/, "Invalid color format"),
});

type Values = z.infer<typeof schema>;

export default function GeneralSettings({ projectId }: { projectId: string }) {
    const { data: project, isError } = useProject(projectId)
    const { handleSubmit, register } = useForm({
        defaultValues: {
            // error: useProject Query is not always working when navigating to the settings
            name: project?.name,
            project_statement: project?.project_statement,
            theme: project?.theme
        },
    })

    return (
        <Card id="general" className="rounded-none">
            <CardHeader>
                <h3 className="text-2xl font-bold">General</h3>
            </CardHeader>
            <CardDescription>
                <p className="px-4">Shown on the project header and in the sidebar.</p>
            </CardDescription>
            <CardContent>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Project Name</Label>
                            <Input type='text' id="name" {...register("name")} />
                        </Field>
                        <Field>
                            <Label htmlFor="project_statement">Project Statement</Label>
                            <Textarea id="project_statement" {...register("project_statement")} />
                        </Field>
                        <Field>
                            <Label htmlFor="theme">Project Theme</Label>
                            <Input id="theme" type="color"  {...register("theme")} />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="justify-end rounded-none">
                <Button type="submit">Save</Button>
            </CardFooter>
        </Card>
    )
}