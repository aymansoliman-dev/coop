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
    <Field>
      <Label htmlFor="name" className="ml-1">Project Name</Label>
      <Input
        id="name"
        placeholder="Project Name"
        aria-invalid={Boolean(errors.name)}
        {...register("name", {
          required: "Project name is required",
          validate: value => value.trim().length > 0 || "Project name is required",
        })}
      />
      {errors.name && <p className="text-sm text-left text-destructive">{errors.name.message}</p>}
    </Field>
  )
}