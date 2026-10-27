"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  Columns3Icon,
  EllipsisVerticalIcon,
  GripVerticalIcon,
  LoaderIcon,
  CheckIcon,
} from "lucide-react"
import { toast } from "sonner"

import { useIsMobile } from "@/shared/hooks/use-mobile"
import { useTasks } from "@/features/tasks/hooks/useTasks"
import { useDeleteTask } from "@/features/tasks/hooks/use-delete-task"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { AddTaskForm } from "./add-task-form"
import {
  type TaskPriority,
  PriorityIcon,
  normalizePriority,
} from "@/assets/icons/priority-icon"
import { useParams } from "next/navigation"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

// Enum columns are typed as string on purpose: swap in your real
// task_priority / task_status / task_category unions if you have them.
export type Task = {
  id: string
  title: string
  description: string | null
  priority: string
  status: string
  category: string | null
  due_date: string | null
  project_id: string
  assignee: string | null
  created_at: string
  // Not a column on tasks: join users in your query if you want a name here.
  assignee_name?: string | null
}

type TasksTableProps = {
  projectId: string
}

type ColumnId =
  | "title"
  | "status"
  | "priority"
  | "category"
  | "due_date"
  | "assignee"

const COLUMNS: {
  id: ColumnId
  header: string
  canHide: boolean
  // rem. Title has no width: it absorbs the leftover space.
  width?: number
}[] = [
  { id: "title", header: "Title", canHide: false },
  { id: "status", header: "Status", canHide: true, width: 9 },
  { id: "priority", header: "Priority", canHide: true, width: 8 },
  { id: "category", header: "Category", canHide: true, width: 10 },
  { id: "due_date", header: "Due date", canHide: true, width: 9 },
  { id: "assignee", header: "Assignee", canHide: true, width: 10 },
]

// Fixed leading/trailing columns, in rem.
const DRAG_COL_REM = 3
const SELECT_COL_REM = 3
const ACTIONS_COL_REM = 3
const TITLE_MIN_REM = 16

const NO_TASKS: Task[] = []

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const label = (value: string) =>
  value.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())

const dateFormat = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
})

const formatDate = (value: string | null) =>
  value ? dateFormat.format(new Date(value)) : "—"

function readOrder(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeOrder(key: string, order: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(order))
  } catch {
    // storage full or blocked: the order just won't persist
  }
}

/* -------------------------------------------------------------------------- */
/* Sorting                                                                    */
/* -------------------------------------------------------------------------- */

type SortBy = "manual" | "due_date" | "priority" | "category" | "status"
type SortDirection = "asc" | "desc"

const SORT_ITEMS: { label: string; value: SortBy }[] = [
  { label: "Custom order", value: "manual" },
  { label: "Sort by due date", value: "due_date" },
  { label: "Sort by priority", value: "priority" },
  { label: "Sort by category", value: "category" },
  { label: "Sort by status", value: "status" },
]

// Higher number = more urgent
const PRIORITY_RANK: Record<TaskPriority, number> = {
  Lowest: 0,
  Low: 1,
  Medium: 2,
  High: 3,
  Highest: 4,
}

// Rows with an empty value always go last, in either direction. Ties keep
// the custom (dragged) order because Array.prototype.sort is stable.
function sortTasks(tasks: Task[], sortBy: SortBy, direction: SortDirection) {
  if (sortBy === "manual") return tasks

  const sign = direction === "asc" ? 1 : -1
  const key = (t: Task): string | number | null => {
    switch (sortBy) {
      case "due_date":
        return t.due_date ? new Date(t.due_date).getTime() : null
      case "priority": {
        const p = normalizePriority(t.priority)
        return p ? PRIORITY_RANK[p] : null
      }
      case "category":
        return t.category
      case "status":
        return t.status
      default:
        return null
    }
  }

  return [...tasks].sort((a, b) => {
    const x = key(a)
    const y = key(b)
    if (x === null && y === null) return 0
    if (x === null) return 1
    if (y === null) return -1
    if (typeof x === "number" && typeof y === "number") return (x - y) * sign
    return String(x).localeCompare(String(y)) * sign
  })
}

/* -------------------------------------------------------------------------- */
/* Column widths (shared by the header table and the body table)              */
/* -------------------------------------------------------------------------- */

function ColGroup({ columns }: { columns: ColumnId[] }) {
  return (
    <colgroup>
      <col style={{ width: `${DRAG_COL_REM}rem` }} />
      <col style={{ width: `${SELECT_COL_REM}rem` }} />
      {columns.map((id) => {
        const width = COLUMNS.find((c) => c.id === id)?.width
        return (
          <col key={id} style={width ? { width: `${width}rem` } : undefined} />
        )
      })}
      <col style={{ width: `${ACTIONS_COL_REM}rem` }} />
    </colgroup>
  )
}

/* -------------------------------------------------------------------------- */
/* Row                                                                        */
/* -------------------------------------------------------------------------- */

function TaskRow({
  task,
  columns,
  isSelected,
  dragDisabled,
  onSelectedChange,
  onView,
  onEdit,
  onDelete,
}: {
  task: Task
  columns: ColumnId[]
  isSelected: boolean
  dragDisabled: boolean
  onSelectedChange: (checked: boolean) => void
  onView: (task: Task) => void
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: dragDisabled })

  function renderCell(id: ColumnId) {
    switch (id) {
      case "title":
        return (
          <Button
            variant="link"
            className="w-fit px-0 text-left text-foreground"
            onClick={() => onView(task)}
          >
            {task.title}
          </Button>
        )
      case "status":
        return (
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {/* assumes your done value is "done": adjust to your enum */}
            {task.status === "done" ? (
              <CheckIcon className="stroke-green-500 dark:stroke-green-400" />
            ) : (
              <LoaderIcon />
            )}
            {label(task.status)}
          </Badge>
        )
      case "priority":
        return (
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            <PriorityIcon priority={task.priority} colored />
            {label(task.priority)}
          </Badge>
        )
      case "category":
        return task.category ? (
          <div className="w-32">
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
              {label(task.category)}
            </Badge>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      case "due_date":
        return (
          <span className="text-muted-foreground">
            {formatDate(task.due_date)}
          </span>
        )
      case "assignee":
        return (
          task.assignee_name ?? (
            <span className="text-muted-foreground">Unassigned</span>
          )
        )
    }
  }

  return (
    <TableRow
      ref={setNodeRef}
      data-state={isSelected && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <TableCell>
        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          size="icon"
          disabled={dragDisabled}
          className="size-7 cursor-grab text-muted-foreground hover:bg-transparent"
        >
          <GripVerticalIcon className="size-3 text-muted-foreground" />
          <span className="sr-only">Drag to reorder</span>
        </Button>
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => onSelectedChange(!!value)}
            aria-label="Select row"
          />
        </div>
      </TableCell>

      {columns.map((id) => (
        <TableCell key={id}>{renderCell(id)}</TableCell>
      ))}

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-open:bg-muted"
                size="icon"
              />
            }
          >
            <EllipsisVerticalIcon />
            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 *:cursor-pointer">
            <DropdownMenuItem onClick={() => onView(task)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(task)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(task.id)
                toast.success("Task ID copied")
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete?.(task)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

/* -------------------------------------------------------------------------- */
/* Drawer                                                                     */
/* -------------------------------------------------------------------------- */

function TaskDrawer({
  task,
  open,
  onOpenChange,
}: {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const isMobile = useIsMobile()

  const details: [string, React.ReactNode][] = task
    ? [
        ["Status", label(task.status)],
        ["Priority", label(task.priority)],
        ["Category", task.category ? label(task.category) : "—"],
        ["Due date", formatDate(task.due_date)],
        ["Assignee", task.assignee_name ?? "Unassigned"],
        ["Created", formatDate(task.created_at)],
      ]
    : []

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerContent>
        {task && (
          <>
            <DrawerHeader className="gap-1">
              <DrawerTitle>{task.title}</DrawerTitle>
              <DrawerDescription>
                {task.description || "No description."}
              </DrawerDescription>
            </DrawerHeader>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 overflow-y-auto px-4 text-sm">
              {details.map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">{term}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

/* -------------------------------------------------------------------------- */
/* Table                                                                      */
/* -------------------------------------------------------------------------- */

export function TasksTable() {
  const { projectId } = useParams()
  const storageKey = `tasks-order:${projectId}`

  const { data: tasks = NO_TASKS, isPending, error } = useTasks()
  const deleteTask = useDeleteTask()

  function handleDelete(taskId: string) {
    deleteTask.mutate(taskId)
  }

  function handleEdit(task: Task) {
    // Placeholder: open your edit dialog or navigate to the edit page here.
    console.log("edit", task.id)
  }

  /* ----------------------------- saved order ------------------------------ */

  // Saved order is read after mount so server and client render the same HTML.
  const [order, setOrder] = React.useState<string[]>([])
  React.useEffect(() => {
    setOrder(readOrder(storageKey))
  }, [storageKey])

  // Tasks that aren't in the saved order (new ones) keep their incoming order
  // and land after the ones you've arranged; stale ids in storage are ignored.
  const orderedTasks = React.useMemo(() => {
    const rank = new Map(order.map((id, index) => [id, index]))
    return [...tasks].sort(
      (a, b) => (rank.get(a.id) ?? order.length) - (rank.get(b.id) ?? order.length)
    )
  }, [tasks, order])

  const taskIds = React.useMemo(
    () => orderedTasks.map((t) => t.id),
    [orderedTasks]
  )

  /* -------------------------------- sorting ------------------------------- */

  const [sortBy, setSortBy] = React.useState<SortBy>("manual")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc")
  const isSorted = sortBy !== "manual"

  const sortedTasks = React.useMemo(
    () => sortTasks(orderedTasks, sortBy, sortDirection),
    [orderedTasks, sortBy, sortDirection]
  )

  const sortedIds = React.useMemo(
    () => sortedTasks.map((t) => t.id),
    [sortedTasks]
  )

  /* ------------------------------- selection ------------------------------ */

  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const selectedCount = tasks.filter((t: Task) => selectedIds.has(t.id)).length
  const allSelected =
    sortedTasks.length > 0 && sortedTasks.every((t) => selectedIds.has(t.id))
  const someSelected = sortedTasks.some((t) => selectedIds.has(t.id))

  function setRowSelected(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function setAllSelected(checked: boolean) {
    setSelectedIds(checked ? new Set(sortedIds) : new Set())
  }

  /* --------------------------- column visibility -------------------------- */

  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >({})
  const visibleColumns = COLUMNS.filter(
    (c) => columnVisibility[c.id] !== false
  ).map((c) => c.id)

  const minWidthRem =
    DRAG_COL_REM +
    SELECT_COL_REM +
    ACTIONS_COL_REM +
    visibleColumns.reduce(
      (sum, id) =>
        sum + (COLUMNS.find((c) => c.id === id)?.width ?? TITLE_MIN_REM),
      0
    )

  /* ------------------------------ drag and drop --------------------------- */

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Works on the full list, so the saved order stays correct.
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return
    const next = arrayMove(
      taskIds,
      taskIds.indexOf(active.id as string),
      taskIds.indexOf(over.id as string)
    )
    setOrder(next)
    writeOrder(storageKey, next)
  }

  /* --------------------------------- drawer ------------------------------- */

  // `viewedTask` stays set while the drawer animates closed.
  const [viewedTask, setViewedTask] = React.useState<Task | null>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  function handleView(task: Task) {
    setViewedTask(task)
    setDrawerOpen(true)
  }

  const sortableId = React.useId()

  return (
    <div className="flex h-full w-full flex-col justify-start gap-4 pt-6 pb-3 select-none">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-2 px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Label htmlFor="sort-by" className="sr-only">
            Sort by
          </Label>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              const next = (value ?? "manual") as SortBy
              setSortBy(next)
              // Most urgent first when sorting by priority
              if (next === "priority") setSortDirection("desc")
            }}
            items={SORT_ITEMS}
          >
            <SelectTrigger size="sm" className="w-fit" id="sort-by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SORT_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!isSorted}
            onClick={() =>
              setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
            }
          >
            {sortDirection === "asc" ? (
              <ArrowUpNarrowWideIcon />
            ) : (
              <ArrowDownWideNarrowIcon />
            )}
            <span className="sr-only">
              {sortDirection === "asc"
                ? "Ascending, switch to descending"
                : "Descending, switch to ascending"}
            </span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" />}
            >
              <Columns3Icon data-icon="inline-start" />
              Columns
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {COLUMNS.filter((c) => c.canHide).map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.id}
                  checked={columnVisibility[c.id] !== false}
                  onCheckedChange={(value) =>
                    setColumnVisibility((prev) => ({ ...prev, [c.id]: !!value }))
                  }
                >
                  {c.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddTaskForm />
        </div>
      </div>

      {/* Table */}
      <div className="flex min-h-0 flex-col gap-3 px-4 lg:px-8">
          <div className="flex min-h-0 flex-col border" /* style={{ minWidth: `${minWidthRem}rem` }} */>
            {/* Header: its own block, it never scrolls vertically */}
            <div className="shrink-0 overflow-y-hidden border-b bg-muted">
              <Table className="table-fixed">
                <ColGroup columns={visibleColumns} />
                <TableHeader className="[&_tr]:border-b-0">
                  <TableRow className="hover:bg-transparent">
                    <TableHead />
                    <TableHead>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={allSelected}
                          indeterminate={someSelected && !allSelected}
                          onCheckedChange={(value) => setAllSelected(!!value)}
                          aria-label="Select all"
                        />
                      </div>
                    </TableHead>
                    {COLUMNS.filter((c) => visibleColumns.includes(c.id)).map(
                      (c) => (
                        <TableHead key={c.id}>{c.header}</TableHead>
                      )
                    )}
                    <TableHead />
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            {/* Body: the only part that scrolls */}
            <div className="scroll-fade-y min-h-0 overflow-y-auto scrollbar-gutter-stable">
              <DndContext
                id={sortableId}
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <Table className="table-fixed">
                  <ColGroup columns={visibleColumns} />
                  <TableBody>
                    {sortedTasks.length ? (
                      <SortableContext
                        items={sortedIds}
                        strategy={verticalListSortingStrategy}
                      >
                        {sortedTasks.map((task) => (
                          <TaskRow
                            key={task.id}
                            task={task}
                            columns={visibleColumns}
                            isSelected={selectedIds.has(task.id)}
                            dragDisabled={isSorted}
                            onSelectedChange={(checked) =>
                              setRowSelected(task.id, checked)
                            }
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={() => handleDelete(task.id)}
                          />
                        ))}
                      </SortableContext>
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumns.length + 3}
                          className="h-24 text-center"
                        >
                          {isPending ? (
                            "Loading tasks…"
                          ) : error ? (
                            <span className="text-destructive">
                              {error.message}
                            </span>
                          ) : (
                            "No tasks yet."
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </DndContext>
            </div>
          </div>
      </div>

      <div className="shrink-0 text-sm text-muted-foreground px-5 lg:px-10">
        {selectedCount} of {tasks.length} row(s) selected.
      </div>

      <TaskDrawer
        task={viewedTask}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  )
}