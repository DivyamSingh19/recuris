export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex min-h-screen">
        <div className="w-[300px] bg-blue-400 p-4">Sidebar here</div>
        <div className="p-4">
        {children}
        </div>
      </div>
    );
  }