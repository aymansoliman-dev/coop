export function ProjectStatement ({ statement }: { statement: string }) {

    if (!statement || statement.trim() === '') return null

    return (
        <p className="text-muted-foreground px-4 lg:px-8 border-b">{statement}</p>
    )
}