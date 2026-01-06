import { getCurrentUser } from "./auth.service";

export const hasRole = (roles: Array<"admin" | "dosen" | "mahasiswa">) => {
  const user = getCurrentUser();
  if (!user) return false;
  return roles.includes(user.role);
};

export const isAdmin = () => hasRole(["admin"]);
export const isDosen = () => hasRole(["dosen"]);
export const isMahasiswa = () => hasRole(["mahasiswa"]);
