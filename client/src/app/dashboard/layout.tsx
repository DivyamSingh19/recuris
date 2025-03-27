"use client"
import { AppSidebar } from "@/components/sidebar/dashboard-sidebar";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.email) {
      // Check localStorage for user data
      const storedToken = localStorage.getItem("token");
      const storedUserRole = localStorage.getItem("role");

      if (!storedToken || !storedUserRole) {
        router.push("/login");
        return;
      }

      // Update Redux state with user data from localStorage
      dispatch(
        setUser({
          id: localStorage.getItem("token")!,
          role: storedUserRole,
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          walletAddress: localStorage.getItem("walletAddress"),
        })
      );
    }
  }, [user.email, dispatch, router]);

  useEffect(() => {
    if (user.role) {
      redirectUser(user.role);
    }
  }, [user.role]);

  const redirectUser = (role: string) => {
    const rolePaths: Record<string, string> = {
      patient: "/dashboard/patient",
      doctor: "/dashboard/doctor",
      admin: "/dashboard/admin",
      diagnostic_center: "/dashboard/diagnostic-center",
    };

    if (rolePaths[role]) {
      router.push(rolePaths[role]);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar user={user} role={user.role} />
        <main className="flex-1 p-2">
          <div className="flex items-center justify-between pb-4 pt-2 border-b border-accent">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <p>Connected Wallet:</p>
              <Link href="/" className="text-sm bg-sidebar hover:underline py-2 px-4 text-primary rounded flex items-center gap-2">
                <span className="flex items-center gap-2"><Image src="/metamask.svg" width={15} height={15} alt="" />{user.walletAddress?.slice(0,6)}...{user.walletAddress?.slice(-4)}</span>
              </Link>
              <Badge className="uppercase py-2">{user?.role}</Badge>
            </div>
          </div>
          <section className="p-4">{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
}
