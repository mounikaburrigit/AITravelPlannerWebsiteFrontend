import api from "../api/axios";

export const createTrip = async (tripData) => {
  const response = await api.post("/trips", tripData);
  return response.data;
};

export const getTrips = async (search = "") => {
  const response = await api.get(`/trips?search=${search}`);

  return response.data;
};

export const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);

  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);

  return response.data;
};

export const toggleFavoriteTrip = async (id) => {
  const response = await api.put(`/trips/${id}/favorite`);

  return response.data;
};

export const getFavoriteTrips = async () => {
  const response = await api.get("/trips/favorites/all");

  return response.data;
};

export const shareTrip = async (id) => {
  const response = await api.put(`/trips/${id}/share`);

  return response.data;
};

export const getSharedTrip = async (id) => {
  const response = await api.get(`/trips/share/${id}`);

  return response.data;
};
