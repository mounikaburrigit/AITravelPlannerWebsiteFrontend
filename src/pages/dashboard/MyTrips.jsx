import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import TripCardSkeleton from "../skeletons/TripCardSkeleton";

import {
  getTrips,
  deleteTrip,
  toggleFavoriteTrip,
  shareTrip,
} from "../../services/tripService";

const MyTrips = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    let isMounted = true;

    const fetchTrips = async () => {
      try {
        setLoading(true);

        const response = await getTrips();

        if (isMounted) {
          const tripsData = response?.trips || [];
          setAllTrips(tripsData);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          toast.error("Failed to load trips", {
            style: {
              background: "rgba(254, 226, 226, 0.95)",
              color: "#991b1b",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            },
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTrips();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTrips = [...allTrips]
    .filter((trip) =>
      search
        ? trip.destination?.toLowerCase().includes(search.toLowerCase())
        : true,
    )
    .filter((trip) => (budgetFilter ? trip.budgetType === budgetFilter : true))
    .filter((trip) => (statusFilter ? trip.status === statusFilter : true))
    .filter((trip) => (favoriteOnly ? trip.isFavorite : true))
    .sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?",
    );
    if (!confirmed) return;

    try {
      const response = await deleteTrip(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      });
      setAllTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Delete failed", {
        style: {
          background: "rgba(254, 226, 226, 0.95)",
          color: "#991b1b",
          borderRadius: "12px",
        },
      });
    }
  };

  const handleFavorite = async (id) => {
    try {
      const response = await toggleFavoriteTrip(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      setAllTrips((prev) =>
        prev.map((trip) =>
          trip._id === id ? { ...trip, isFavorite: !trip.isFavorite } : trip,
        ),
      );
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error(error?.response?.data?.message || "Failed", {
        style: {
          background: "rgba(254, 226, 226, 0.95)",
          color: "#991b1b",
          borderRadius: "12px",
        },
      });
    }
  };

  const handleShare = async (id) => {
    try {
      const response = await shareTrip(id);
      await navigator.clipboard.writeText(response.shareUrl);
      toast.success("Share link copied to clipboard", {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
    } catch (error) {
      console.error("Share error:", error);
      toast.error(error?.response?.data?.message || "Share failed", {
        style: {
          background: "rgba(254, 226, 226, 0.95)",
          color: "#991b1b",
          borderRadius: "12px",
        },
      });
    }
  };

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
        <TripCardSkeleton />
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.h1
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-black text-slate-800 dark:text-white tracking-tight"
        >
          My Trips
        </motion.h1>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/dashboard/create-trip"
            className="bg-slate-600/90 dark:bg-slate-500/90 backdrop-blur-sm hover:bg-slate-700 dark:hover:bg-slate-400 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold inline-block"
          >
            ✨ Create Trip
          </Link>
        </motion.div>
      </div>

      {/* Filters */}
      {/* Filters - 3 top, 2 bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-8 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Filter & Search
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all"
          />

          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all"
          >
            <option value="">All Budgets</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all"
          >
            <option value="">All Status</option>
            <option value="Planning">Planning</option>
            <option value="Booked">Booked</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={favoriteOnly}
              onChange={() => setFavoriteOnly(!favoriteOnly)}
              className="w-5 h-5 accent-yellow-500"
            />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Favorites Only
            </span>
          </label>
        </div>
      </motion.div>

      {/* Trips Grid */}
      {!loading && filteredTrips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-4xl p-12 text-center shadow-xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <span className="text-6xl mb-4">✈️</span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            No Trips Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {allTrips.length === 0
              ? "You haven't created any trips yet. Create your first trip!"
              : "No trips match your current filters. Try adjusting them."}
          </p>
          <Link
            to="/dashboard/create-trip"
            className="bg-slate-600/90 dark:bg-slate-500/90 backdrop-blur-sm hover:bg-slate-700 dark:hover:bg-slate-400 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg inline-block"
          >
            ✨ Create Your First Trip
          </Link>
        </motion.div>
      ) : (
        !loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip._id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Actions */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                      {trip.destination}
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      📍 {trip.country || "Destination not specified"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleFavorite(trip._id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        trip.isFavorite
                          ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {trip.isFavorite ? "❤️" : "🤍"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(trip._id)}
                      className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 flex items-center justify-center"
                    >
                      🔗
                    </motion.button>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-wrap gap-2 mb-5">
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

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {trip.budgetType} Budget
                  </span>
                </div>

                {/* Trip Info */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Duration
                    </p>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {trip.days} Days
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Travelers
                    </p>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {trip.travelers || 1}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Budget
                    </p>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {trip.budgetType}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Transport
                    </p>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {trip.transportMode || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Interests */}
                {trip.interests?.length > 0 && (
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Interests
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {trip.interests.slice(0, 3).map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-700 mb-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {trip.days} Days Trip
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <Link
                    to={`/dashboard/trips/${trip._id}`}
                    className="text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold transition-all"
                  >
                    View
                  </Link>

                  <Link
                    to={`/dashboard/trips/edit/${trip._id}`}
                    className="text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all"
                  >
                    Edit
                  </Link>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(trip._id)}
                    className="py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )
      )}
    </motion.div>
  );
};

export default MyTrips;
