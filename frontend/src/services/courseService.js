import api from "./api";

const getCourses = async (params = {}) => {
  const response = await api.get("/courses", { params });
  return response.data;
};

const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export default { getCourses, getCourseById };