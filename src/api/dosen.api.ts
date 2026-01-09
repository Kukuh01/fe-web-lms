import api from "../services/axios";

export const getDosen = async () => {
  const response = await api.get("/dosen/");
  return response.data;
};

export const getDosenDetail = async (id: number) => {
  const response = await api.get(`/dosen/${id}`);
  return response.data;
};

export const createDosen = async (data: any) => {
  const response = await api.post("/dosen/", data);
  return response.data;
};

export const updateDosen = async (id: number, data: any) => {
  const response = await api.put(`/dosen/${id}`, data);
  return response.data;
};

export const deleteDosen = async (id: number) => {
  const response = await api.delete(`/dosen/${id}`);
  return response.data;
};
