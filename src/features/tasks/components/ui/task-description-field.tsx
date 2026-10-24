import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"

export function TaskDescriptionField() {
  return (
    <Field className="border relative">
      <Label className="w-24! h-10 px-2 border-r border-b bg-card text-muted-foreground absolute">Description</Label>
      <Textarea 
        name="description"
        className="border-none pt-12 h-60!"
      />
    </Field>
  )
}