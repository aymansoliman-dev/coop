import { useStackCatalog } from "@/features/stack/hooks/use-stack-catalog";
import { useProjectStack } from "@/features/stack/hooks/useProjectStack";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/shared/components/ui/card";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/shared/components/ui/combobox";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import type { ProjectStackItem, StackCatalogItem } from "@/features/stack/types";
import { useUpdateProjectStack } from "@/features/stack/hooks/use-update-project-stack";

type Fields = {
    stack: StackCatalogItem[]
}

const EMPTY_STACK_CATALOG: StackCatalogItem[] = []
const EMPTY_PROJECT_STACK: ProjectStackItem[] = []


const TECH_FIRST_ELEMENTS = [
    "typescript",
    "javascript",
    "react",
    "nextjs",
    "nodejs",
    "npm",
    "pnpm",
    "yarn",
    "vite",
    "vue",
    "nuxt",
    "angular",
    "svelte",
    "tailwindcss",
    "html5",
    "css3",
    "sass",
    "python",
    "django",
    "flask",
    "java",
    "spring",
    "csharp",
    "dotnet",
    "go",
    "rust",
    "php",
    "laravel",
    "ruby",
    "rubyonrails",
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "graphql",
    "docker",
    "kubernetes",
    "amazonwebservices",
    "googlecloud",
    "firebase",
    "git",
    "github",
] as const

export default function TechStackSettings({ projectId }: { projectId: string }) {
    const { data: stackCatalog } = useStackCatalog() as { data?: StackCatalogItem[] }
    const { data: projectStack } = useProjectStack(projectId) as { data?: ProjectStackItem[] }
    const { mutate } = useUpdateProjectStack()
    const catalog = stackCatalog ?? EMPTY_STACK_CATALOG
    const savedStack = projectStack ?? EMPTY_PROJECT_STACK

    const techFirstCatalog = useMemo(() => {
        const priority = new Map(TECH_FIRST_ELEMENTS.map((slug, index) => [slug.trim(), index]))

        return [...catalog].sort((a, b) => {
            const aPriority = priority.get(a.name) ?? Number.MAX_SAFE_INTEGER
            const bPriority = priority.get(b.name) ?? Number.MAX_SAFE_INTEGER

            if (aPriority !== bPriority) {
                return aPriority - bPriority
            }

            return a.name.localeCompare(b.name)
        })
    }, [catalog])

    const selectedStack = useMemo(
        () => savedStack
            .map((item) => techFirstCatalog.find((catalogItem) => catalogItem.name === item.name))
            .filter((item): item is StackCatalogItem => item !== undefined),
        [savedStack, techFirstCatalog],
    )

    const anchor = useComboboxAnchor()

    const {
        control,
        formState: { isDirty, isLoading },
        handleSubmit,
        reset,
    } = useForm<Fields>({
        defaultValues: {
            stack: [],
        },
    })

    useEffect(() => {
        reset({ stack: selectedStack })
    }, [reset, selectedStack])

    const onSubmit: SubmitHandler<Fields> = (data) => {
        const updates = data.stack.map((item) => ({
            name: item.name,
        }))

        mutate({ projectId, updates })
    }

    return (
        <Card id="tech-stack" className="rounded-none py-0 block *:p-3 md:*:p-4">
            <CardHeader className="text-xl font-bold pt-0 pb-0.5! flex items-center gap-2 justify-between">
                Tech Stack
            </CardHeader>
            <CardDescription className="px-(--card-spacing) py-0!">
                Manage the technologies used in this project.
            </CardDescription>
            <CardContent>
                <form id="tech-stack-settings-form" onSubmit={handleSubmit(onSubmit)} className="select-none">
                    <Controller
                        name="stack"
                        control={control}
                        render={({ field }) => (
                            <Combobox
                                multiple
                                autoHighlight
                                items={techFirstCatalog}
                                limit={50}
                                value={field.value}
                                onValueChange={field.onChange}
                                itemToStringLabel={(item) => item.name}
                                itemToStringValue={(item) => item.name}
                                isItemEqualToValue={(item, value) => item.name === value.name}
                            >
                                <ComboboxChips ref={anchor} className="w-full">
                                    <ComboboxValue>
                                        {(items) => (
                                            <>
                                                {items.map((item: StackCatalogItem) => (
                                                    <ComboboxChip key={item.name} className={`h-full`}>
                                                        <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.name}/${item.name}-original.svg`} alt="" width={20} height={20} loading="lazy" unoptimized />
                                                        <span>{item.name}</span>
                                                    </ComboboxChip>
                                                ))}
                                                <ComboboxChipsInput />
                                            </>
                                        )}
                                    </ComboboxValue>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}>
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item: StackCatalogItem) => (
                                            <ComboboxItem key={item.name} value={item}>
                                                <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.name}/${item.name}-original.svg`} alt="" width={20} height={20} loading="lazy" unoptimized />
                                                <span>{item.name}</span>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        )}
                    />
                </form>
            </CardContent>
            <CardFooter className="justify-end rounded-none p-0! *:px-8">
                <Button
                    type="reset"
                    variant="secondary"
                    onClick={() => reset({ stack: selectedStack })}
                    disabled={!isDirty || isLoading}
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    form="tech-stack-settings-form"
                    disabled={!isDirty || isLoading}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
