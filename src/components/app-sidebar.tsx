import {
  LogOut,
  User,
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  Book,
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

const navItems = [
  { title: "Dashboard", url: "/dashboard-admin", icon: Home, roles: ["admin"] },
  { title: "Home", url: "/home", icon: Home, roles: ["mahasiswa"] },
  { title: "Courses", url: "/courses", icon: Inbox, roles: ["mahasiswa"] },
  { title: "Manage Users", url: "/manage-users", icon: User, roles: ["admin"] },
  {
    title: "Manage Mahasiswa",
    url: "/manage-mahasiswa",
    icon: User,
    roles: ["admin"],
  },
  {
    title: "Manage Dosen",
    url: "/manage-dosen",
    icon: User,
    roles: ["admin"],
  },
  {
    title: "Dashboard",
    url: "/dashboard-dosen",
    icon: Home,
    roles: ["dosen"],
  },
  {
    title: "Manage Course",
    url: "/manage-courses",
    icon: Book,
    roles: ["admin", "dosen"],
  },
  {
    title: "Assignments",
    url: "/assignments",
    icon: Calendar,
    roles: ["mahasiswa"],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    roles: ["mahasiswa", "admin"],
  },
];

export default function AppSidebar() {
  const { user } = useAuth();
  console.log("Data User di Sidebar:", user);

  const filteredItems = navItems.filter((item) => {
    // Jika data user belum ada (loading), jangan tampilkan menu dulu
    if (!user) return false;
    // Cek apakah role user ada di dalam daftar roles menu
    return item.roles.includes(user.role);
  });

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
                {user?.role === "mahasiswa" && (
                  <>
                    <span className="truncate text-xs">
                      {user?.nim || "..."}
                    </span>
                    <span className="truncate text-xs text-muted-foreground italic">
                      {user?.program_studi || "..."}
                    </span>
                  </>
                )}
                {user?.role === "admin" && (
                  <>
                    <span className="truncate text-xs">Admin Akademik</span>
                  </>
                )}
                {user?.role === "dosen" && (
                  <>
                    <span className="truncate text-xs">
                      {user?.nidn || "..."}
                    </span>
                    <span className="truncate text-xs text-muted-foreground italic">
                      {user?.fakultas || "..."}
                    </span>
                  </>
                )}
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
              {filteredItems.map((item) => (
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
