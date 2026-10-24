import { Button } from "@/shared/components/ui/button"
import { useIsMobile } from "@/shared/hooks/use-mobile"
import { PlusIcon } from "lucide-react"
import { Timestamp } from "next/dist/server/lib/cache-handlers/types"
import { useCallback, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter, 
  DrawerClose 
} from "@/shared/components/ui/drawer"
import { 
  TaskTitleField, 
  TaskDescriptionField, 
  TaskPriorityField, 
  // TaskCategoryField, 
  TaskStackField,
  TaskDueDateField
} from "@/features/tasks/components/ui"
import { useAddTask } from "@/features/tasks/hooks/use-add-task"
import { KBD } from "@/shared/components/kbd"

type TaskFormValues = {
  title       : string
  description : string
  priority    : string
  category    : string
  stack       : string[]
  due_date    : Timestamp | null
}

export function AddTaskForm({ projectId }: { projectId: string }) {
  const isMobile = useIsMobile()
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null)
  const { mutate, isPending } = useAddTask()
  const drawerTriggerRef = useRef<HTMLButtonElement | null>(null)

  const form = useForm<TaskFormValues>({
    defaultValues: { title: "", description: "", priority: "Medium", stack: [], due_date: null },
    mode: "onChange",
  })

  const addTask = useCallback((event: any) => {
    event.preventDefault()
    const submittedForm = event.currentTarget as HTMLFormElement
    const formData = new FormData(submittedForm)

    const taskData = {
      title: (formData.get("title") as string).trim(),
      description: formData.get("description") as string,
      priority: (formData.get('priority') as string).toLowerCase(),
      stack: formData.get("stack") ? (formData.get("stack") as string).split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [],
      due_date: formData.get("due_date"),
    }
    
    mutate({projectId, taskData}, {
      onSuccess: () => {
        submittedForm.reset()
        form.reset()
        drawerCloseRef.current!.click()
      }
    })
  }, [form, mutate])

  return (
    <Drawer disablePointerDismissal swipeDirection={isMobile? 'down': 'right'}>
        <DrawerTrigger render={
          <Button size="sm" ref={drawerTriggerRef} className="flex gap-2 items-center">
            <PlusIcon />
            Add Task
            <KBD className="ml-2 bg-primary-foreground/20 text-primary-foreground" action={() => drawerTriggerRef.current?.click()} enabled={!!projectId}>Alt + N</KBD>
          </Button>} 
        />

        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>Add new task</DrawerTitle>
          </DrawerHeader>
          
          <div className="grow">
            <FormProvider {...form}>
              <form onSubmit={addTask} className="h-full flex flex-col gap-4 p-4">
                <TaskTitleField />
                <TaskDescriptionField />
                <TaskPriorityField />
                {/* <TaskCategoryField /> */}
                <TaskStackField />
                <TaskDueDateField />

                <DrawerFooter className="flex-row p-0 *:grow">
                  <Button type="submit">Add Task</Button>
                  <DrawerClose render={<Button ref={drawerCloseRef} variant="outline" onClick={() => form.reset()} />}>Discard</DrawerClose>
                </DrawerFooter>
              </form>
            </FormProvider>
          </div>
        </DrawerContent>
    </Drawer>
  )
}