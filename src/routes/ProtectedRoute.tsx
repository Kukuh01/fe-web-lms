import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../services/auth.service";

type Props = {
  allowedRoles: Array<"admin" | "dosen" | "mahasiswa">;
};

export default function ProtectedRoute({ allowedRoles }: Props) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
