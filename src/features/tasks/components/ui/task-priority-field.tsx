import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { Controller, useFormContext } from "react-hook-form"
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectLabel, 
  SelectContent, 
  SelectGroup, 
  SelectItem 
} from "@/shared/components/ui/select"
import { type TaskPriority, PriorityIcon } from "@/assets/icons/priority-icon"

type TaskFormValues = { priority: string }  

export function TaskPriorityField() {
  const { control } = useFormContext<TaskFormValues>()
  
  return (
    <Field className="flex-row gap-0 border">
      <Label className="w-24! px-2 border-r text-muted-foreground">Priority</Label>
      <Controller
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            name={field.name}
            defaultValue="Medium"
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger id="privacy" className="h-full!">
              <SelectValue className="flex gap-3 items-center">
                <PriorityIcon priority={field.value as TaskPriority} colored />
                {field.value}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border-0">
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                {
                  ["Highest", "High", "Medium", "Low", "Lowest"].map((priority) => (
                    <SelectItem key={priority} value={priority} className="h-10 flex gap-3 items-center cursor-pointer">
                      <PriorityIcon priority={priority as TaskPriority} colored />
                      {priority}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  )
}