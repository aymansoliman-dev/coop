import { Field } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useFormContext } from "react-hook-form"

export function ProjectNameField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ name: string }>()

  return (
    <Field className="flex-row gap-0 border">
      <Input
        id="name"
        placeholder="Project Name"
        className="border-0!"
        aria-invalid={Boolean(errors.name)}
        {...register("name", {
          required: "Project name is required",
          validate: value => value.trim().length > 0 || "Project name is required",
        })}
        required
      />
    </Field>
  )
}