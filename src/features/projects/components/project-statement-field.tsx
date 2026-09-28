import { Textarea } from "@/shared/components/ui/textarea"
import { Field } from "@/shared/components/ui/field"
import { useFormContext } from "react-hook-form"

type ProjectFormValues = { project_statement: string }

export function ProjectStatementField () {
  const { register } = useFormContext<ProjectFormValues>()

  return (
    <Field className="h-40 min-h-0">
      <Textarea id="project_statement" placeholder="Project Statement" className="h-full min-h-0 resize-none overflow-y-auto" {...register("project_statement")} />
    </Field>
  )
}