"use client"

import * as React from "react"
import {
  Book,
  CreditCard,
  Home,
  LucideLogOut,
  Settings2,
  User2,
  Wrench,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Docs",
      url: "#",
      icon: Book,
    },
    {
      title: "API Reference",
      url: "#",
      icon: Wrench,
    },
    {
      title: "Billing",
      url: "#",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Profile",
      url: "#",
      icon: User2,
    },
    {
      name: "Sign Out",
      url: "#",
      icon: LucideLogOut,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <Image 
          src='/deeptrack-logo.png'
          alt='DeepTrack logo'
          width={120}
          height={120}
          className="mt-2 p-2 border-b-slate-600"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
          <div className="rounded-lg bg-black p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image src='/deeptrack-logo.png' width={100} height={100} alt={"logo"} />
                <div className="ml-1 flex space-x-[2px]">
                  <div className="w-[3px] h-4 bg-foreground"></div>
                  <div className="w-[3px] h-4 bg-foreground"></div>
                  <div className="w-[3px] h-4 bg-foreground"></div>
                </div>
              </div>
              <div className="bg-white rounded-full p-1.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-black text-lg">?</span>
                </div>
              </div>
            </div>
            <h3 className="font-semibold mb-1">Need help?</h3>
            <p className="text-sm text-muted-foreground mb-3">Please check our docs</p>
            <Button
              className="w-full bg-muted-foreground/10 hover:bg-muted-foreground/20 hover:text-white text-white"
              variant="ghost"
            >
              DOCUMENTATION
            </Button>
          </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
