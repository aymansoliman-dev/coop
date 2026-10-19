import { Select, SelectTrigger, SelectValue, SelectLabel, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select"
import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { Controller, useFormContext } from "react-hook-form"

type ProjectFormValues = { privacy: string }

export function ProjectPrivacyField() {
  const { control } = useFormContext<ProjectFormValues>()

  return (
    <Field className="flex-row gap-0 border h-10">
      <Label htmlFor="privacy" className="w-20! px-2 border-r text-muted-foreground">Privacy</Label>
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
            <SelectTrigger id="privacy" className="h-full!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="">
                <SelectLabel>Privacy</SelectLabel>
                <SelectItem value="Public" className="h-10">Public</SelectItem>
                <SelectItem value="Private" className="h-10">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  )
}