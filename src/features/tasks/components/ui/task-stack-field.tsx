import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/shared/components/ui/combobox"
import { Field } from "@/shared/components/ui/field"
import { Label } from "@/shared/components/ui/label"
import { Controller } from "react-hook-form"
import type { StackCatalogItem } from "@/features/stack/types";
import { TECH_FIRST_ELEMENTS } from "@/features/stack/storage/constants"
import { useStackCatalog } from "@/features/stack/hooks/use-stack-catalog"
import { useMemo } from "react"
import Image from "next/image"

const EMPTY_STACK_CATALOG: StackCatalogItem[] = []

export function TaskStackField() {
  const { data: stackCatalog } = useStackCatalog() as { data?: StackCatalogItem[] }
  const catalog = stackCatalog ?? EMPTY_STACK_CATALOG
  
  const techFirstCatalog = useMemo(() => {
      const priority = new Map(TECH_FIRST_ELEMENTS.map((slug, index) => [slug.trim(), index]))

      return [...catalog].sort((a, b) => {
          const aPriority = priority.get(a.name) ?? Number.MAX_SAFE_INTEGER
          const bPriority = priority.get(b.name) ?? Number.MAX_SAFE_INTEGER

          if (aPriority !== bPriority) {
              return aPriority - bPriority
          }

          return a.name.localeCompare(b.name)
      })
  }, [catalog])

  const anchor = useComboboxAnchor()

  return (
    <Field className="gap-0 border max-h-32">
      <Label className="h-10 px-2 border-b text-muted-foreground bg-card">Stack</Label>
      <Controller
        name="stack"
        render={({ field }) => (
            <Combobox
                multiple
                autoHighlight
                items={techFirstCatalog}
                limit={32}
                value={field.value}
                onValueChange={field.onChange}
                itemToStringLabel={(item) => item.name}
                itemToStringValue={(item) => item.name}
                isItemEqualToValue={(item, value) => item.name === value.name}
            >
                <ComboboxChips ref={anchor} className="border-0 overflow-y-scroll scroll-fade-y">
                    <ComboboxValue>
                        {(items) => (
                            <>
                                {items.map((item: StackCatalogItem) => (
                                    <ComboboxChip key={item.name}>
                                        <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.name}/${item.name}-original.svg`} alt="" width={20} height={20} loading="lazy" unoptimized />
                                        <span>{item.name}</span>
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput />
                            </>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(item: StackCatalogItem) => (
                            <ComboboxItem key={item.name} value={item}>
                                <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.name}/${item.name}-original.svg`} alt="" width={20} height={20} loading="lazy" unoptimized />
                                <span>{item.name}</span>
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        )}
    />
    </Field>
  )
}