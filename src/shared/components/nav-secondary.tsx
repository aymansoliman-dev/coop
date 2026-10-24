"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar"

import Link from "next/link"
import {useParams, usePathname} from "next/navigation";
import { SearchIcon, Settings2Icon, CircleHelpIcon, SunIcon, MoonIcon, MonitorIcon, XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/shared/components/ui/dialog";
import { useTheme } from "../hooks/use-theme";
import { RadioGroup } from "@base-ui/react/radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { KBD } from "./kbd";

const items = [
  {
    title: "Get Help",
    url: "#",
    icon: (
      <CircleHelpIcon
      />
    ),
  },
  {
    title: "Search",
    url: "/search",
    icon: (
      <SearchIcon
      />
    ),
  },
]

export function NavSecondary({...props}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props} className="border-y p-0 mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>

          <AppGeneralSettings />

          {items.map((item) => (
            <SidebarMenuButton key={item.title} className="h-12 p-0 gap-0" render={<Link href={item.url} />} isActive={item.url === pathname}>
              <div className="w-12 p-4">
                {item.icon}
              </div>
              <span className="grow h-full flex items-center">{item.title}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const themes = [
  { label: "Light", value: "light", icon: (<SunIcon />) },
  { label: "Dark", value: "dark", icon: (<MoonIcon />) },
  { label: "System", value: "system", icon: (<MonitorIcon />) },
]

function AppGeneralSettings() {
  const [theme, setThemeAndStore] = useTheme()
  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null)
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <Dialog>
      <DialogTrigger ref={dialogTriggerRef} render={
        <SidebarMenuButton key="settings" className="h-12 p-0 gap-0" isActive={false}>
          <div className="w-12 p-4">
            <Settings2Icon />
          </div>
          <span className="grow h-full flex items-center">Settings</span>
          <KBD className="ml-auto mr-4 hidden md:flex" action={() => dialogTriggerRef.current?.click()} enabled={!projectId}>Ctrl + Shift + ,</KBD>
        </SidebarMenuButton>
      }
      />
      <DialogContent className="min-w-[90dvw] min-h-[90dvh]">
        <DialogClose className="absolute right-0 h-10 aspect-square" render={<Button variant="ghost"><XIcon /></Button>} />
        <RadioGroup value={theme} onValueChange={setThemeAndStore} className="flex">
          {themes.map((themeOption) => (
            <RadioGroupItem key={themeOption.value} value={themeOption.value} className="p-2">
              {themeOption.icon}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  )
}