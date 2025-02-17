"use client";

import { Book, Database, Home, Search, Settings, User2, Key } from "lucide-react"
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
import { usePathname } from "next/navigation"

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
    external: true,
  },
  {
    title: "Verifications",
    url: "#",
    icon: Search,
  },
  {
    title: "API Keys",
    url: "/api-keys",
    icon: Key,
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
  const pathname = usePathname()
  return (
    <Sidebar className="bg-gray-800 text-white min-h-screen flex flex-col justify-between">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="border-b border-gray-700">
            <Image
              src='/deeptrack-logo.png'
              alt='DeepTrack logo'
              width={120}
              height={120}
              className="mt-2 p-2"
            />
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    target={item.external ? "_blank" : "_self"}
                    className={`flex items-center gap-2 px-4 py-4 rounded-xl hover:bg-gray-700 hover:text-white transition-colors ${pathname === item.url ? "bg-black" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${pathname === item.url ? "bg-gray-700" : "bg-black"}`}>
                    <item.icon className={`w-5 h-5 ${pathname === item.url ? "text-gray-300" : ""}`} />
                    </div>
                    <span>{item.title}</span>
                  </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700 bg-black m-4 rounded-2xl">
        <Image
          src='/deeptrack-logo.png'
          alt='DeepTrack logo'
          width={80}
          height={80}
          className="mb-2"
        />
        <p className="text-sm text-white"><b>Need help?</b><br />Please check our docs</p>
        <a
          href="https://deeptrack.ai/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-center text-sm text-white bg-gray-600 hover:bg-gray-500 rounded-lg px-4 py-1 transition-colors"
        >
          DOCUMENTATION
        </a>
      </div>
    </Sidebar>
  )
}
