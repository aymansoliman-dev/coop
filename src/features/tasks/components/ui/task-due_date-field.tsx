import { Field } from "@/shared/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shared/components/ui/input-group"
import { Label } from "@/shared/components/ui/label"
import { useState } from "react"
import { parseDate } from "chrono-node"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { CalendarIcon, InfoIcon } from "lucide-react"
import { Calendar } from "@/shared/components/ui/calendar"

const DEFAULT_VALUE = "In 2 days"

function formatDate(date: Date | undefined) {
  if (!date) return ""

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

// Local calendar day at 00:00, used for state and display
function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// What the form submits: 00:00 UTC of the same calendar day the user sees
function toDueDateISO(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString()
}

// Parse natural language and strip the time
function parse(text: string) {
  const parsed = parseDate(text)
  return parsed ? startOfDay(parsed) : undefined
}

export function TaskDueDateField() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(DEFAULT_VALUE)
  const [date, setDate] = useState<Date | undefined>(() => parse(DEFAULT_VALUE))

  const isInvalid = value.trim() !== "" && !date

  return (
    <div>
      {/* This is what the form actually submits: an ISO timestamp at 00:00 UTC, or empty */}
      <input type="hidden" name="due_date" value={date ? toDueDateISO(date) : ""} />

      <Field className="flex-row gap-0 border">
        <Label htmlFor="due_date" className="h-10 w-24! px-2 border-r text-muted-foreground">
          Due Date
        </Label>
        <InputGroup className="h-full border-none">
          <InputGroupInput
            id="due_date"
            value={value}
            placeholder="Tomorrow or next week"
            aria-invalid={isInvalid}
            onChange={(e) => {
              setValue(e.target.value)
              // Unparseable or empty text clears the date instead of keeping a stale one
              setDate(parse(e.target.value))
            }}
            onBlur={() => {
              // Replace "tomorrow" with the actual date once the user leaves the field
              if (date) setValue(formatDate(date))
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />

          <InputGroupAddon align="inline-end">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <InputGroupButton
                    type="button"
                    id="date-picker"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Select date"
                  >
                    <CalendarIcon />
                    <span className="sr-only">Select Date</span>
                  </InputGroupButton>
                }
              />
              <PopoverContent className="w-auto overflow-hidden p-0" align="end" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  defaultMonth={date}
                  onSelect={(picked) => {
                    const next = picked ? startOfDay(picked) : undefined
                    setDate(next)
                    setValue(formatDate(next))
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <div className="mt-2 mx-1 text-xs text-muted-foreground flex items-center gap-1">
        <InfoIcon size={14} />
        {date ? (
          <>
            Your task due date will be set to{" "}
            <span className="font-medium">{formatDate(date)}</span>
          </>
        ) : isInvalid ? (
          "Couldn't understand that date"
        ) : (
          "No due date"
        )}
      </div>
    </div>
  )
}