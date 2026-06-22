import api from "../api/axios";

export const generateItinerary = async (tripId) => {
  const response = await api.post(`/ai/generate-itinerary/${tripId}`);

  return response.data;
};

export const generateBudget = async (tripId) => {
  const response = await api.post(`/ai/generate-budget/${tripId}`);

  return response.data;
};

export const generateHotels = async (tripId) => {
  const response = await api.post(`/ai/generate-hotels/${tripId}`);

  return response.data;
};

export const generateCompanion = async (tripId) => {
  const response = await api.post(`/ai/generate-companion/${tripId}`);

  return response.data;
};

export const regenerateItinerary = async (tripId) => {
  const response = await api.post(`/ai/regenerate-itinerary/${tripId}`);

  return response.data;
};

export const regenerateDay = async (tripId, day) => {
  const response = await api.post(`/ai/regenerate-day/${tripId}`, { day });

  return response.data;
};
