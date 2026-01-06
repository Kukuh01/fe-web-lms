import AppSidebar from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 bg-slate-100">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
