import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put(
    "/user/profile",
    userData
  );

  return response.data;
};