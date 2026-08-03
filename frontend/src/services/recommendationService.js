import api from "./api";

const getRecommendations = async () => {
  const response = await api.get("/recommendations");
  return response.data;
};

export default { getRecommendations };