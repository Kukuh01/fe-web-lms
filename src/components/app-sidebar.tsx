import {
  LogOut,
  User,
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
} from "lucide-react";
import { Sidebar, SidebarHeader } from "./ui/sidebar"; // Impor SidebarHeader
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { logout } from "../services/auth.service";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Courses", url: "/courses", icon: Inbox },
  { title: "Assignments", url: "/assignments", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export default function AppSidebar() {
  const { user, loading } = useAuth();

  return (
    <Sidebar collapsible="icon">
      {/* 1. PROFILE PINDAH KE ATAS (HEADER) */}
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-900 text-white">
                <User className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {user?.name || "Loading..."}
                </span>
                <span className="truncate text-xs">{user?.nim || "..."}</span>
                <span className="truncate text-xs text-muted-foreground italic">
                  {user?.program_studi || "..."}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 2. FOOTER KHUSUS LOGOUT */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              tooltip="Logout"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700"
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
