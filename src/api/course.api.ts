// import api from "../services/axios";
import http from "../services/http";

export const getCourses = async () => {
  const response = await http.get("/courses/");
  return response.data;
};

export const getCourseDetail = async (id: number) => {
  const response = await http.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (data: FormData) => {
  const response = await http.post("/courses", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
