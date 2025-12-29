import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import "./App.css";
import HomePage from "./features/home/HomePage.tsx";
import CoursesPage from "./features/courses/CoursesPage.tsx";
import AssignmentsPage from "./features/assignments/AssignmentsPage.tsx";
import DetailCourse from "./features/courses/DetailCourse.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/course/:slug",
    element: <DetailCourse />,
  },
  {
    path: "/assignments",
    element: <AssignmentsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
