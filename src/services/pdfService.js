import api from "../api/axios";

export const downloadTripPdf =
  async (tripId) => {
    const response =
      await api.get(
        `/pdf/trip/${tripId}`,
        {
          responseType: "blob",
        }
      );

    return response.data;
  };