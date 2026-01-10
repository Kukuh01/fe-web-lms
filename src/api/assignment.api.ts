import api from "../services/axios";

export const getAssignmentByLesson = async (id: number) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

export const saveAssignment = async (lessonId: number, data: any) => {
  await api.post(`/assignments/${lessonId}/assignment`, data);
};

export const deleteAssignment = async (lessonId: number) => {
  await api.delete(`/assignments/${lessonId}/assignment`);
};
