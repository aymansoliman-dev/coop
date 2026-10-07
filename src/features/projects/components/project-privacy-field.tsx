import { Select, SelectTrigger, SelectValue, SelectLabel, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select"
import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { Controller, useFormContext } from "react-hook-form"

type ProjectFormValues = { privacy: string }

export function ProjectPrivacyField() {
  const { control } = useFormContext<ProjectFormValues>()

  return (
    <Field>
      <Label htmlFor="privacy" className="ml-1">Privacy</Label>
      <Controller
        name="privacy"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
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
        )}
      />
    </Field>
  )
}