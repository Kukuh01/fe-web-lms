import api from "../services/axios";

export const getMahasiswaStats = async () => {
  const response = await api.get("/mahasiswa/stats");
  return response.data;
};

export const getMahasiswa = async () => {
  const response = await api.get("/mahasiswa/");
  return response.data;
};

export const getMahasiswaDetail = async (id: number) => {
  const response = await api.get(`/mahasiswa/${id}`);
  return response.data;
};

export const createMahasiswa = async (data: any) => {
  const response = await api.post("/mahasiswa/", data);
  return response.data;
};

export const updateMahasiswa = async (id: number, data: any) => {
  const response = await api.put(`/mahasiswa/${id}`, data);
  return response.data;
};

export const deleteMahasiswa = async (id: number) => {
  const response = await api.delete(`/mahasiswa/${id}`);
  return response.data;
};
