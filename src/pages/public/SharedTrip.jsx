import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getSharedTrip,
} from "../../services/tripService";

const SharedTrip = () => {
  const { id } = useParams();

  const [trip, setTrip] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response =
          await getSharedTrip(id);

        setTrip(response.trip);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10 text-center">
        Trip not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-4xl font-bold mb-4">
          {trip.destination}
        </h1>

        <p className="text-gray-500 mb-8">
          {trip.days} Days •{" "}
          {trip.budgetType} Budget
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Itinerary
        </h2>

        <pre className="whitespace-pre-wrap">
          {JSON.stringify(
            trip.itinerary,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default SharedTrip;