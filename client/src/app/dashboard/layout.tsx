"use client"
import { AppSidebar } from "@/components/sidebar/dashboard-sidebar";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const user = useSelector((state: RootState) => state.user);
    return (
      <div className="flex min-h-screen">
        <SidebarProvider>
        <AppSidebar user={user} role={user.role} />
          <main className="flex-1 p-2">
              <div className="flex items-center justify-between pb-4 pt-2 border-b border-accent">
                <SidebarTrigger />
                <Badge className="uppercase">{user?.role}</Badge>
              </div>
              <section className="p-4">
                {children}
              </section>
          </main>
        </SidebarProvider>       
      </div>
    );
  }