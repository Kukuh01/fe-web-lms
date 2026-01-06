import api from "../services/axios";

export const getAssignmentByLesson = async (id: number) => {
  const response = await api.get(`/assignments/lesson/${id}`);
  return response.data;
};
