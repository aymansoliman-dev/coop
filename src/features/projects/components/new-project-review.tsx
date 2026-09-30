import { useFormContext } from "react-hook-form"

export type ProjectFormValues = {
  name: string
  privacy: string
  project_statement: string
  logo: File | null
}

export function NewProjectReview() {
  const { watch } = useFormContext<ProjectFormValues>()
  const name = watch("name")
  const privacy = watch("privacy")
  const statement = watch("project_statement")

  return (
    <div className="h-40 min-h-0 space-y-3 overflow-y-auto border p-3 text-left">
      <div>
        <p className="text-xs text-muted-foreground">Project name</p>
        <p className="wrap-break-word font-medium">{name || "Not provided"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Privacy</p>
        <p className="font-medium">{privacy || "Private"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Project statement</p>
        <p className="whitespace-pre-wrap wrap-break-word">
          {statement || "Not provided"}
        </p>
      </div>
    </div>
  )
}
