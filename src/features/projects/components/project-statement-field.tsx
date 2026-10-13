import { Textarea } from "@/shared/components/ui/textarea"
import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { useFormContext } from "react-hook-form"

type ProjectFormValues = { statement: string }

export function ProjectStatementField () {
  const { register } = useFormContext<ProjectFormValues>()

  return (
    <Field className="min-h-0 border relative grow">
      <Label htmlFor="statement" className="h-10 absolute bg-card w-fit! px-2 border-r border-b text-muted-foreground">Statement</Label>
      <Textarea id="statement" placeholder="Project Statement" className="h-full pt-12 min-h-0 resize-none overflow-y-auto border-none" {...register("statement")} />
    </Field>
  )
}