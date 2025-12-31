import http from "../services/http";

export const getAssignmentByLesson = async (id: number) => {
  const response = await http.get(`/assignments/lesson/${id}`);
  return response.data;
};
