"use client"

import {
  type LucideIcon,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url?: string
    icon: LucideIcon
    onClick?: () => void
    disabled?: boolean
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="uppercase">Account Pages</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            {item.url ? (
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white hover:text-primary"
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.disabled ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <item.icon className="h-4 w-4" />
                )}
                <span>{item.name}</span>
              </Button>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}