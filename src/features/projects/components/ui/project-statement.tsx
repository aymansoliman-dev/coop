import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { XIcon, BookTextIcon } from "lucide-react"

export function ProjectStatement ({ statement }: { statement: string }) {

    if (!statement || statement.trim() === '') return null

    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="outline">
                    <BookTextIcon />
                    Project Statement
                </Button>
                } 
            />
            <DialogContent className="max-w-4xl">
                <DialogClose className="absolute top-0 right-0 h-10 aspect-square" render={<Button variant="ghost"><XIcon /></Button>} />
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BookTextIcon />
                        Project Statement
                    </DialogTitle>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[64vh] min-w-[32dvw] overflow-y-auto px-4 scroll-fade-y">
                    <p className="text-muted-foreground mb-4 text-xs">This is the project statement provided by the project owner. It describes the purpose, goals, and vision of the project.</p>
                    <p className="whitespace-pre-wrap">{statement}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}