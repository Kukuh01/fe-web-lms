import api from "../services/axios";

export const getCourses = async () => {
  const response = await api.get("/courses/");
  return response.data;
};

export const getCourseDetail = async (id: number) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (data: FormData) => {
  const response = await api.post("/courses", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
