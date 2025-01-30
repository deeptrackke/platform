import { Book, Database, Home,Search, Settings, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Insights",
    url: "/insights",
    icon: Database,
  },
  {
    title: "Docs",
    url: "https://deeptrack.ai/docs",
    icon: Book,
  },
  {
    title: "Verifications",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Organization",
    url: "#",
    icon: User2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <SidebarHeader className="border-b">
        <Image 
          src='/deeptrack-logo.png'
          alt='DeepTrack logo'
          width={120}
          height={120}
          className="mt-2 p-2 border-b-slate-600"
        />
      </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
         
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
