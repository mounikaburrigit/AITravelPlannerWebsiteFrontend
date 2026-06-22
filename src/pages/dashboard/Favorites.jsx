import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getFavoriteTrips } from "../../services/tripService";
import FavoriteSkeleton from "../skeletons/FavoriteSkeleton";

const Favorites = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchFavorites = async () => {
      try {
        const response = await getFavoriteTrips();

        if (mounted) {
          setTrips(response.trips || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchFavorites();

    return () => {
      mounted = false;
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>

        <FavoriteSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto p-4 md:p-6 bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 min-h-screen"
    >
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="w-12 h-12 rounded-full bg-yellow-500/90 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
          ★
        </span>
        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
          Favorite Trips
        </h1>
      </motion.div>

      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-4xl p-12 text-center shadow-xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <span className="text-6xl mb-4">⭐</span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            No Favorite Trips Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Mark your trips as favorite to see them here.
          </p>
          <Link
            to="/dashboard/trips"
            className="bg-slate-600/90 dark:bg-slate-500/90 backdrop-blur-sm hover:bg-slate-700 dark:hover:bg-slate-400 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg inline-block"
          >
            ✨ Browse My Trips
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {trips.map((trip) => (
            <div
              key={trip._id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-yellow-500 font-semibold">
                  ⭐ Favorite
                </span>

                {trip.status && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      trip.status === "Planning"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : trip.status === "Booked"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    }`}
                  >
                    {trip.status}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {trip.destination}
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mb-5">
                📍 {trip.country || "Destination not specified"}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Duration
                  </p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {trip.days} Days
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Travelers
                  </p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {trip.travelers}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Budget
                  </p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {trip.budgetType}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transport
                  </p>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {trip.transportMode || "N/A"}
                  </p>
                </div>
              </div>

              {trip.interests?.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Interests
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {trip.interests.slice(0, 3).map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500">
                  Created {new Date(trip.createdAt).toLocaleDateString()}
                </span>

                <Link
                  to={`/dashboard/trips/${trip._id}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold transition-all"
                >
                  View Trip →
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Favorites;
