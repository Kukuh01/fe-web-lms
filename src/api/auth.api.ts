import api from "../services/axios";

export const loginAPI = (username: string, password: string) => {
  return api.post("accounts/login", { username, password });
};

export const getMe = async () => {
  const response = await api.get("accounts/me");
  return response.data;
};
