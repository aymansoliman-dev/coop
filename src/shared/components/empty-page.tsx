import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group"
import { Kbd } from "@/shared/components/ui/kbd"

export function EmptyPage({ message }: { message?: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{message}</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
