import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { ArrowLeftIcon, ArrowRightIcon, PaletteIcon, PlusCircleIcon, TextAlignStartIcon, XIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateProject } from "@/features/projects/hooks/useCreateProject"
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperNav,
  StepperTitle,
  StepperPanel,
  StepperDescription,
  StepperContent
} from '@/shared/components/ui/stepper'
import { ProjectNameField } from '@/features/projects/components/project-name-field'
import { ProjectPrivacyField } from '@/features/projects/components/project-privacy-field'
import { BookOpenIcon, AwardIcon } from 'lucide-react'
import { ProjectLogoField } from "./project-logo-field"
import { ProjectStatementField } from "./project-statement-field"
import { NewProjectReview, type ProjectFormValues } from "./new-project-review"
import { SidebarMenuButton } from "@/shared/components/ui/sidebar"

const steps = [
  {
    id: 'details',
    title: 'Details',
    description: 'Enter project name, and select its privacy setting',
    content: 
      <div className="flex flex-col gap-4 grow">
        <ProjectNameField />
        <ProjectPrivacyField />
      </div>
    ,
    icon: (
      <BookOpenIcon />
    ),
    optional: false
  },
  {
    id: 'logo',
    title: 'Logo',
    description: 'Drag & drop or select a logo for your project',
    content:
      <div className="grow">
        <ProjectLogoField />
      </div>
    ,
    icon: (
      <PaletteIcon />
    ),
    optional: true
  },
  {
    id: 'statement',
    title: 'Statement',
    description: 'Provide a project statement',
    content:
      <div className="grow">
        <ProjectStatementField />
      </div>
    ,
    icon: (
      <TextAlignStartIcon />
    ),
    optional: true
  },
  {
    id: 'done',
    title: 'Done',
    description: 'All set. review completed',
    content: (
      <div className="flex flex-col gap-4 grow">
        <NewProjectReview />
      </div>
    ),
    icon: (
      <AwardIcon />
    ),
  }
]

export function NewProjectDialog() {
  const { mutate, isPending } = useCreateProject()

  const form = useForm<ProjectFormValues>({
    defaultValues: { name: "", privacy: "Private", project_statement: "", logo: null },
    mode: "onChange",
  })
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(steps[0].id)

  const currentIndex = steps.findIndex(s => s.id === current)
  const goNext = async () => {
    if (currentIndex === 0 && !(await form.trigger("name", { shouldFocus: true }))) return

    setCurrent(steps[Math.min(currentIndex + 1, steps.length - 1)].id)
  }
  const goBack = () => setCurrent(steps[Math.max(currentIndex - 1, 0)].id)
  
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setCurrent(steps[0].id)
      form.reset()
    }
  }

  const createNewProject = useCallback((event: any) => {
    event.preventDefault()
    const submittedForm = event.currentTarget as HTMLFormElement
    const formData = new FormData(submittedForm)
    const logo = formData.get("logo") as File | null

    const newProject = {
      name: (formData.get("name") as string).trim(),
      privacy: formData.get("privacy") as string,
      logo: logo && logo.size > 0 ? logo : null, // empty picker gives a 0-byte File
      project_statement: (formData.get("project_statement") as string).trim() || null,
    }
    
    mutate(newProject, {
      onSuccess: () => {
        submittedForm.reset()
        form.reset()
        setCurrent(steps[0].id)
        setOpen(false)
      }
    })
  }, [form, mutate])
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <SidebarMenuButton
            variant="default"
            className="w-full group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! flex justify-center items-center bg-primary text-primary-foreground hover:bg-primary/80"
            aria-label="Create new project"
            tooltip="Create new project"
          >
            <span className="group-data-[collapsible=icon]:hidden">Create new project</span>
            <PlusCircleIcon />
          </SidebarMenuButton>
        }
      />
      <DialogContent className="relative">
        <FormProvider {...form}>
          <form onSubmit={createNewProject} className="flex flex-col gap-4">
          <Stepper
            steps={steps}
            value={current}
            onValueChange={setCurrent}
            beforeStepChange={async ({ from, to }) => {
              if (from.id === steps[0].id && to.id !== from.id) {
                return form.trigger("name", { shouldFocus: true })
              }

              return true
            }}
            className='flex h-full flex-col justify-center gap-6 md:flex-row'
            orientation='vertical'
            responsive
          >
            <StepperNav className='w-full md:w-60'>
              {steps.map((step, index) => (
                <StepperItem key={step.id} stepId={step.id} className='relative items-center md:items-start'>
                  <StepperTrigger type="button" tabIndex={-1} className='items-center gap-2.5 md:items-start md:pb-15 md:last:pb-0'>
                    <StepperIndicator>{index + 1}</StepperIndicator>
                    <div className='hidden text-left md:block'>
                        <div className="flex items-center gap-1">
                          <StepperTitle>{step.title}</StepperTitle>
                          { step.optional && <span className="text-xs text-muted-foreground">(Optional)</span>}
                        </div>
                        <StepperDescription>{step.description}</StepperDescription>
                    </div>
                  </StepperTrigger>
                  {index < steps.length - 1 && (
                    <StepperSeparator className='mx-1 min-w-16 self-center group-data-[orientation=vertical]/stepper-nav:absolute group-data-[orientation=vertical]/stepper-nav:inset-y-0 group-data-[orientation=vertical]/stepper-nav:top-[calc(50%-22px)] group-data-[orientation=vertical]/stepper-nav:left-3 group-data-[orientation=vertical]/stepper-nav:min-w-0 group-data-[orientation=vertical]/stepper-nav:h-15' />
                  )}
                </StepperItem>
              ))}
            </StepperNav>
            <StepperPanel className='min-h-0 w-full text-center text-sm md:w-116'>
              {steps.map(step => (
                <StepperContent key={step.id} value={step.id} forceMount className='h-full'>
                  <div className='bg-muted border-primary/15 flex flex-col justify-between gap-4 border-2 border-dashed p-4 md:p-8 h-full'>
                    <div className='space-y-2 flex flex-col gap-4 grow'>
                      <div>
                        <h3 className='text-lg font-medium'>{step.title}</h3>
                        <p className='text-sm'>{step.description}</p>
                      </div>
                      
                      { step.content }

                    </div>

                    <div className='flex items-center justify-between'>
                        <Button
                          type='button'
                          onClick={(event) => {
                            event.preventDefault()
                            goBack()
                          }}
                          disabled={currentIndex === 0 || isPending}
                          variant={currentIndex === 0 ? 'secondary' : 'default'}
                        >
                          <ArrowLeftIcon className='size-4' />{' '}
                          Back
                        </Button>

                        { currentIndex < steps.length - 1 ? (
                          <Button
                          type='button'
                          onClick={(event) => {
                            event.preventDefault()
                            goNext()
                          }}
                          variant={currentIndex === steps.length - 1 ? 'secondary' : 'default'}
                          disabled={isPending}
                        >
                          Next{' '}
                          <ArrowRightIcon className='size-4' />
                        </Button>
                        ) : (
                          <Button type="submit" disabled={isPending}>Create project</Button>
                        )}
                    </div>
                  </div>
                </StepperContent>
              ))}
            </StepperPanel>
          </Stepper>
          </form>
        </FormProvider>
        <DialogClose className="absolute -right-3 -top-3 rounded-full p-0 aspect-square" render={<Button variant="outline" type="button"><XIcon /></Button>} />
      </DialogContent>
    </Dialog>
  )
}