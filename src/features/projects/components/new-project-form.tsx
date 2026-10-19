import { FormProvider, useForm    } from "react-hook-form"
import { ProjectStatementField    } from "@/features/projects/components/ui/project-statement-field"
import { ProjectPrivacyField      } from '@/features/projects/components/ui/project-privacy-field'
import { ProjectNameField         } from '@/features/projects/components/ui/project-name-field'
import { ProjectLogoField         } from "@/features/projects/components/ui/project-logo-field"
import { SidebarMenuButton        } from "@/shared/components/ui/sidebar"
import { useCreateProject         } from "@/features/projects/hooks/useCreateProject"
import { InfoIcon, PlusSquareIcon } from "lucide-react"
import { useCallback, useRef      } from "react"
import { Button                   } from "@/shared/components/ui/button"
import { Drawer, 
  DrawerClose, DrawerTrigger, 
  DrawerContent, DrawerHeader, 
  DrawerTitle, DrawerDescription, 
  DrawerFooter                    } from "@/shared/components/ui/drawer"
import { useIsMobile              } from "@/shared/hooks/use-mobile"

type ProjectFormValues = {
  name: string
  privacy: string
  statement: string
  logo: File | null
}

export function NewProjectForm() {
  const { mutate, isPending } = useCreateProject()
  const isMobile = useIsMobile()
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null)

  const form = useForm<ProjectFormValues>({
    defaultValues: { name: "", privacy: "Private", statement: "", logo: null },
    mode: "onChange",
  })

  const createNewProject = useCallback((event: any) => {
    event.preventDefault()
    const submittedForm = event.currentTarget as HTMLFormElement
    const formData = new FormData(submittedForm)
    const logo = formData.get("logo") as File | null

    const newProject = {
      name: (formData.get("name") as string).trim(),
      privacy: formData.get("privacy") as string,
      logo: logo && logo.size > 0 ? logo : null, // empty picker gives a 0-byte File
      statement: (formData.get("statement") as string).trim() || null,
    }
    
    mutate(newProject, {
      onSuccess: () => {
        submittedForm.reset()
        form.reset()
        drawerCloseRef.current!.click()
      }
    })
  }, [form, mutate])
  
  return (
    <Drawer disablePointerDismissal swipeDirection={isMobile? 'down': 'left'}>
      <DrawerTrigger
        render={
          <SidebarMenuButton
            variant="default"
            className="w-full h-12 p-0 gap-0 flex items-center bg-primary text-primary-foreground"
            aria-label="Create new project"
            tooltip="Create new project"
          >
            <div className="w-12 p-4">
              <PlusSquareIcon />
            </div>
            <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">New Project</span>
          </SidebarMenuButton>
        }
      />
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create new project</DrawerTitle>
          <DrawerDescription>
            Add new project details to create a new project
          </DrawerDescription>
        </DrawerHeader>
        {/*  */}
        <div className="grow">
          <FormProvider {...form}>
            <form onSubmit={createNewProject} className="flex flex-col h-full">
              <div className="grow p-4 flex flex-col gap-4">
                <div className="flex">
                  <ProjectLogoField />
                  <ProjectNameField />
                </div>
                <ProjectPrivacyField />
                <ProjectStatementField />
                <p className="text-muted-foreground text-xs flex items-center gap-1"><InfoIcon size={14} />These settings can be changed later</p>
              </div>

              <DrawerFooter className="flex-row *:grow">
                <DrawerClose render={<Button ref={drawerCloseRef} variant="outline" onClick={() => form.reset()} />}>Discard</DrawerClose>
                <Button type="submit" disabled={isPending}>Create project</Button>
              </DrawerFooter>
            </form>
          </FormProvider>
        </div>
        {/*  */}
      </DrawerContent>
    </Drawer>
  )
}

function userRef(arg0: null) {
  throw new Error("Function not implemented.")
}
