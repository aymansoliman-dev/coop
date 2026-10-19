import { Field } from "@/shared/components/ui/field"
import { FileInput } from "@/features/projects/components/ui/file-input"

export function ProjectLogoField() {
  return (
    <Field className="w-fit border border-r-0">
      <FileInput name="logo" />
    </Field>
  )
}