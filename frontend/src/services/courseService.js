import api from "./api";

const getCourses = async (params = {}) => {
  const response = await api.get("/courses", { params });
  return response.data;
};

const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export default {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};