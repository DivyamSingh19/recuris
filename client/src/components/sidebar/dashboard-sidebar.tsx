"use client"

import { Book, BookOpen, Brain, Calendar, ChartPie, ChevronUp, ClipboardCheck, CreditCard, FilePlus, FileText, FolderOpen, Home, LifeBuoy, LogOut, User, User2, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { clearUser } from "@/redux/userSlice"
import { signOut } from "@/actions/auth"


const navItems = {
  patient: [
    { href: "/dashboard/patient", label: "Dashboard", icon: Home },
    { href: "/dashboard/patient/manage-docs", label: "Manage Docs", icon: FileText },
    { href: "/dashboard/patient/book-appointment", label: "Book Appointment", icon: Book },
    { href: "/dashboard/patient/appointments", label: "My Appointments", icon: Calendar },
    // { href: "/dashboard/patient/ai-insights", label: "AI Insights based on Report", icon: Brain },
    { href: "/dashboard/patient/help-support", label: "Help & Support", icon: LifeBuoy },
    { href: "/dashboard/patient/transactions", label: "Transactions", icon: CreditCard },
    { href: "/dashboard/patient/manage-profile", label: "Manage Profile", icon: User }
  ],
  doctor: [
    { href: "/dashboard/doctor", label: "Dashboard", icon: Home },
    { href: "/dashboard/doctor/patient-records", label: "Patient Records", icon: FolderOpen },
    { href: "/dashboard/doctor/appointments", label: "Appointments", icon: Calendar },
    { href: "/dashboard/doctor/generate-prescription", label: "Generate Prescription", icon: FilePlus },
    { href: "/dashboard/doctor/summarizer", label: "Summarizer", icon: BookOpen },
  ],
  diagnostic_center: [
    { href: "/dashboard/diagnostic-center", label: "Dashboard", icon: Home },
    { href: "/dashboard/diagnostic-center/patients", label: "Patient", icon: Users },
    { href: "/dashboard/diagnostic-center/check-record", label: "Check Record", icon: ClipboardCheck },
    { href: "/dashboard/diagnostic-center/create-record", label: "Create Record", icon: FilePlus },
    { href: "/dashboard/diagnostic-center/manage-profile", label: "Manage Profile", icon: User },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: Home },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: ChartPie },
    { href: "/dashboard/admin/manage-doctors", label: "Manage Doctors", icon: Users },
  ],
};



export function AppSidebar({ user, role }: { user: any; role: string | null}) {
  
  const items = navItems[role as keyof typeof navItems] || [];
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    router.push("/login");
    dispatch(clearUser());
  }
  
  const handleManageProfile = () => {
    const role = localStorage.getItem("role");
    if (role === "patient") {
      router.push("/dashboard/patient/manage-profile");
    }
    if (role === "doctor") {
      router.push("/dashboard/doctor/manage-profile");
    }
    if (role === "diagnostic_center") {
      router.push("/dashboard/diagnostic-center/manage-profile");
    }
    if (role === "admin") {
      router.push("/dashboard/admin/manage-profile");
    }
  }

  return (
    <Sidebar className=""> 
      <SidebarHeader>
        <Link href="/" className="p-2 flex gap-2 items-center">
          <Image src="/logo.png" width={30} height={30} alt="logo" />
          <span className="font-semibold text-xl uppercase text-purple-900">Recuris</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className={`${isActive ? "bg-sidebar-primary/10 text-primary" : "bg-none"}`} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> <span className="truncate">{user?.email || "Loading..."}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleManageProfile} className="flex items-center">
                  <User /> <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                  <LogOut /> <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}