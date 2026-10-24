import { Field } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";

export function TaskTitleField() {
  return (
    <Field className="flex-row gap-0 border">
      <Label className="w-24! px-2 border-r text-muted-foreground">Title</Label>
      <Input 
        name="title"
        className="border-none"
        required
      />
    </Field>
  )
}