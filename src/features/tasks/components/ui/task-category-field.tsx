import { Field } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

export function TaskCategoryField() {
  return (
    <Field className="flex-row gap-0 border">
      <Label className="w-24! px-2 border-r text-muted-foreground">Category</Label>
      <Input
        name="category"
        className="border-none"
      />
    </Field>
  )
}