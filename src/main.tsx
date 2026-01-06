import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import "./App.css";

import Login from "./features/auth/Login";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./features/dashboard/AdminDashboard.tsx";
import DosenDashboard from "./features/dashboard/DosenDashboard.tsx";
import MahasiswaDashboard from "./features/dashboard/MahasiswaDashboard.tsx";
import CoursesPage from "./features/courses/CoursesPage.tsx";
import AssignmentsPage from "./features/assignments/AssignmentsPage.tsx";
import DetailCourse from "./features/courses/DetailCourse.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import HomePageMahasiswa from "./features/home/HomePageMahasiswa.tsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  // ADMIN
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ path: "/admin", element: <AdminDashboard /> }],
  },

  // DOSEN
  {
    element: <ProtectedRoute allowedRoles={["dosen"]} />,
    children: [{ path: "/dosen", element: <DosenDashboard /> }],
  },

  // MAHASISWA
  {
    element: <ProtectedRoute allowedRoles={["mahasiswa"]} />,
    children: [
      { path: "/mahasiswa", element: <MahasiswaDashboard /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/assignments", element: <AssignmentsPage /> },
      { path: "/", element: <HomePageMahasiswa /> },
      { path: "/course/:id", element: <DetailCourse /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
