export function ProjectStatement ({ statement }: { statement: string }) {

    if (!statement || statement.trim() === '') return null

    return (
        <p className="text-gray-300 px-4 lg:px-8 border-b">{statement}</p>
    )
}