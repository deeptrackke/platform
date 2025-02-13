"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getInitials } from "@/utils/getInitials";
import {
  Database,
  Home,
  Key,
  Loader2,
  LogOut,
  Search,
  Settings,
  User2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Verifications",
    url: "/kyc",
    icon: Search,
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
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch the session info on mount.
  useEffect(() => {
    setIsMounted(true);
    const fetchUser = async () => {
      try {
        const response = await fetch('api/auth/current-user')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to fetch user", error)
      }
    }
    fetchUser()
  }, []);

  // const initials = getInitials(userName);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Signed out successfully!", {
          duration: 2000,
          position: "bottom-center",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Sign out failed");
      }
    } catch (error) {
      console.error("Signout error:", error);
      toast.error("An error occurred during sign out");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <Toaster />
      <Sidebar className="bg-gray-800 text-white min-h-screen flex flex-col justify-between">
        <SidebarContent>
          <SidebarGroup>
            <SidebarHeader className="border-b border-gray-700 mb-2">
              <Image
                src="/deeptrack-logo.png"
                alt="DeepTrack logo"
                width={120}
                height={120}
                className="mt-2 p-2"
                priority
              />

            </SidebarHeader>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-2 px-4 py-4 rounded-xl hover:bg-gray-600 transition-colors ${pathname === item.url ? "bg-black" : ""
                          }`}
                      >
                        <div
                          className="p-2 rounded-xl"
                        >
                          <item.icon
                            className={`w-5 h-5 ${pathname === item.url ? "text-gray-300" : ""
                              }`}
                          />
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
            src="/deeptrack-logo.png"
            alt="DeepTrack logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <p className="text-sm text-white">
            <b>Need help?</b>
            <br />
            Please check our docs
          </p>
          <a
            href="https://docs.deeptrack.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-center text-sm text-black bg-white hover:bg-gray-500 rounded-lg px-4 py-1 transition-colors"
          >
            DOCUMENTATION
          </a>
        </div>

        {/* Avatar and Sign Out */}
        <div className="p-4 border-t border-gray-700 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar className="size-10 hover:opacity-75 transition">
              <AvatarFallback className="bg-sky-600 text-white">
                {user?.name ? getInitials(user.name) : (isMounted ? "DT" : <Loader2 />)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{user?.name || <Loader2 />}</span>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute bottom-16 left-4 bg-gray-800 shadow-lg rounded-lg overflow-hidden w-40">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                {isSigningOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </Sidebar>
    </>
  );
}