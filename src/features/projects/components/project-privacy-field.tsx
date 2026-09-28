import { Select, SelectTrigger, SelectValue, SelectLabel, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select"
import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { useFormContext } from "react-hook-form"

type ProjectFormValues = { privacy: string }

export function ProjectPrivacyField() {
  const { register } = useFormContext<ProjectFormValues>()

  return (
    <Field>
      <Label htmlFor="privacy" className="ml-1">Privacy</Label>
      <Select defaultValue="Private" {...register("privacy", { required: true })}>
        <SelectTrigger id="privacy">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Privacy</SelectLabel>
            <SelectItem value="Public">Public</SelectItem>
            <SelectItem value="Private">Private</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}