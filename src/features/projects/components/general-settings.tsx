'use client'

import { useProject } from '@/features/projects/hooks/useProject'
import { useUpdateProject } from '@/features/projects/hooks/use-update-project'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
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
import { Switch } from '@/shared/components/ui/switch'
import { LockIcon, LockOpenIcon } from '@/assets/icons'

const schema = z.object({
  name: z.string().min(1, "Required").max(50),
  statement: z.string().max(1000),
  theme: z.string().regex(/^#[0-9A-Fa-f]{8}$/, "Invalid color format"),
  private: z.boolean("Required"),
}).strict();

type Fields = z.infer<typeof schema>;

export default function GeneralSettings({ projectId }: { projectId: string }) {
    const { data: project, isError } = useProject(projectId)
    const { mutate } = useUpdateProject()
    const [isMounted, setIsMounted] = useState(false)

    const { control, formState: { isDirty, dirtyFields, isLoading }, handleSubmit, register, reset } = useForm<Fields>({
        defaultValues: {
            // error: useProject Query is not always working when navigating to the settings
            name: project?.name,
            statement: project?.statement,
            theme: project?.theme,
            private: project?.private ?? false
        },
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!project) return

        reset({
            name: project.name,
            statement: project.statement,
            theme: project.theme,
            private: project.private ?? false,
        })
    }, [project, reset])

    const resetToProjectDefaults = () => {
        if (!project) return

        reset({
            name: project.name,
            statement: project.statement,
            theme: project.theme,
            private: project.private ?? false,
        })
    }

    const onSubmit: SubmitHandler<Fields> = async (data) => {
        const updates = Object.fromEntries(
            Object.keys(dirtyFields).map((field) =>[field, data[field as keyof Fields]
            ])
        )

        mutate({ projectId, updates })

        console.log(updates)
    }

    const resetDisabled = isMounted && !isDirty ? true : undefined
    const saveDisabled = isMounted && (!isDirty || isLoading) ? true : undefined

    return (
        <Card id="general" className="rounded-none py-0 block *:p-3 md:*:p-4">
            <CardHeader className="text-xl font-bold pt-0 pb-0.5! flex items-center gap-2 justify-between">
                <h4>General</h4>
                <Field className="flex-row-reverse gap-2 w-fit cursor-pointer">
                    <Controller
                        name="private"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Switch
                                    id="private"
                                    checked={field.value ?? true}
                                    onCheckedChange={field.onChange}
                                />
                                <Label htmlFor="private">
                                    {field.value ? (
                                        <LockIcon size={20} />
                                    ) : (
                                        <LockOpenIcon size={20} />
                                    )}
                                </Label>
                            </>
                        )}
                    />
                </Field>
            </CardHeader>
            <CardDescription className="px-(--card-spacing) py-0!">Shown on the project header and in the sidebar.</CardDescription>
            <CardContent>
                <form id="general-settings-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="flex justify-between gap-2">
                            <Field className="flex-row gap-0 border">
                                <Label htmlFor="name" className="w-fit! text-nowrap px-4 text-muted-foreground border-r bg-card">Name</Label>
                                <Input type='text' id="name" {...register("name")} className="border-none" />
                            </Field>
                            <Field className="w-auto border">
                                <Input id="theme" type="color"  {...register("theme")} className="w-12! p-0" />
                            </Field>
                        </div>
                        <Field className="border relative">
                            <Label htmlFor="statement" className="absolute top-0 left-0 p-2 text-muted-foreground border-b border-r w-fit! bg-card">Statement</Label>
                            <Textarea id="statement" {...register("statement")} className="border-none pt-10" />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="justify-end rounded-none p-0! *:px-8">
                <Button type="button" variant="secondary" onClick={resetToProjectDefaults} disabled={resetDisabled}>Reset</Button>
                <Button type="submit" form="general-settings-form" disabled={saveDisabled}>Save</Button>
            </CardFooter>
        </Card>
    )
}