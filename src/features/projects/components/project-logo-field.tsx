import { Field } from "@/shared/components/ui/field"
import { FileInput } from "@/features/projects/components/ui/file-input"

export function ProjectLogoField() {
  return (
    <Field>
      <FileInput name="logo" />
    </Field>
  )
}