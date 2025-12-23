import api from "../services/axios";

export const login = (data: string) => api.post("/auth/login", data);

export const getProfile = () => api.get("/auth/me");
