import api from "../services/axios";

export const createLesson = async (courseId: number, data: any) => {
  await api.post(`/lessons/${courseId}/lessons`, data);
};

export const updateLesson = async (lessonId: number, data: any) => {
  await api.put(`/lessons/${lessonId}`, data);
};

export const deleteLesson = async (lessonId: number) => {
  await api.delete(`/lessons/${lessonId}`);
};
