import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getTripById } from "../../services/tripService";
import toast from "react-hot-toast";
import { FaFilePdf, FaSyncAlt } from "react-icons/fa";
import TripDetailsSkeleton from "../skeletons/TripDetailsSkeleton";

import {
  generateItinerary,
  generateBudget,
  generateHotels,
  generateCompanion,
  regenerateItinerary,
  regenerateDay,
} from "../../services/aiService";

import { downloadTripPdf } from "../../services/pdfService";
import TripHero from "./trip-details/TripHero";
import TripStats from "./trip-details/TripStats";
import TripTabs from "./trip-details/TripTabs";
import ItinerarySection from "./trip-details/sections/ItinerarySection";
import BudgetSection from "./trip-details/sections/BudgetSection";
import HotelsSection from "./trip-details/sections/HotelsSection";
import CompanionSection from "./trip-details/sections/CompanionSection";

const TripDetails = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("Daily Travel Plan");
  const [aiLoading, setAiLoading] = useState(false);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [hotelLoading, setHotelLoading] = useState(false);
  const [companionLoading, setCompanionLoading] = useState(false);
  const [regenerateLoading, setRegenerateLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchTrip = async () => {
      try {
        const response = await getTripById(id);

        if (mounted) {
          setTrip(response.trip);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrip();

    return () => {
      mounted = false;
    };
  }, [id]);

  const loadTrip = async () => {
    try {
      const response = await getTripById(id);
      setTrip(response.trip);
    } catch (error) {
      console.error(error);
    }
  };

  if (!trip) {
    return (
      <div className="text-center py-20 bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TripDetailsSkeleton />
        </motion.div>
      </div>
    );
  }

  const handleGenerateItinerary = async () => {
    try {
      setAiLoading(true);
      const response = await generateItinerary(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate itinerary",
        {
          style: {
            background: "rgba(254, 226, 226, 0.95)",
            color: "#991b1b",
            borderRadius: "12px",
          },
        },
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateBudget = async () => {
    try {
      setBudgetLoading(true);
      const response = await generateBudget(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate budget",
        {
          style: {
            background: "rgba(254, 226, 226, 0.95)",
            color: "#991b1b",
            borderRadius: "12px",
          },
        },
      );
    } finally {
      setBudgetLoading(false);
    }
  };

  const handleGenerateHotels = async () => {
    try {
      setHotelLoading(true);
      const response = await generateHotels(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate hotels",
        {
          style: {
            background: "rgba(254, 226, 226, 0.95)",
            color: "#991b1b",
            borderRadius: "12px",
          },
        },
      );
    } finally {
      setHotelLoading(false);
    }
  };

  const handleGenerateCompanion = async () => {
    try {
      setCompanionLoading(true);
      const response = await generateCompanion(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate companion",
        {
          style: {
            background: "rgba(254, 226, 226, 0.95)",
            color: "#991b1b",
            borderRadius: "12px",
          },
        },
      );
    } finally {
      setCompanionLoading(false);
    }
  };

  const handleRegenerateItinerary = async () => {
    try {
      setRegenerateLoading(true);
      const response = await regenerateItinerary(id);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed", {
        style: {
          background: "rgba(254, 226, 226, 0.95)",
          color: "#991b1b",
          borderRadius: "12px",
        },
      });
    } finally {
      setRegenerateLoading(false);
    }
  };

  const handleRegenerateDay = async (dayNumber) => {
    try {
      const response = await regenerateDay(id, dayNumber);
      toast.success(response.message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          color: "#1f2937",
          borderRadius: "12px",
          border: "1px solid rgba(156, 163, 175, 0.3)",
        },
      });
      loadTrip();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to regenerate day",
        {
          style: {
            background: "rgba(254, 226, 226, 0.95)",
            color: "#991b1b",
            borderRadius: "12px",
          },
        },
      );
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const blob = await downloadTripPdf(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${trip.destination}-trip.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      toast.error("Failed to download PDF", {
        style: {
          background: "rgba(254, 226, 226, 0.95)",
          color: "#991b1b",
          borderRadius: "12px",
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto p-4 md:p-6 bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-4xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50"
      >
        <TripHero trip={trip} />
        <TripStats trip={trip} />
        <div className="flex flex-wrap gap-3 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: regenerateLoading ? 1 : 1.02 }}
            whileTap={{ scale: regenerateLoading ? 1 : 0.98 }}
            onClick={handleRegenerateItinerary}
            disabled={regenerateLoading}
            className="flex items-center gap-2 bg-amber-600/90 dark:bg-amber-500/90 backdrop-blur-sm hover:bg-amber-700 dark:hover:bg-amber-400 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            <>
              <FaSyncAlt
                className={`${regenerateLoading ? "animate-spin" : ""}`}
              />
              <span>
                {regenerateLoading
                  ? "Regenerating..."
                  : "Regenerate Full Daily Travel Plan"}
              </span>
            </>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 bg-red-500/90 dark:bg-red-400/90 backdrop-blur-sm hover:bg-red-600 dark:hover:bg-red-300 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all"
          >
            <>
              <FaFilePdf />
              <span>Export PDF</span>
            </>
          </motion.button>
        </div>
        <TripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Daily Travel Plan" && (
          <ItinerarySection
            trip={trip}
            onRegenerateDay={handleRegenerateDay}
            onGenerateItinerary={handleGenerateItinerary}
            aiLoading={aiLoading}
          />
        )}

        {activeTab === "Budget Planner" && (
          <BudgetSection
            trip={trip}
            budgetLoading={budgetLoading}
            onGenerateBudget={handleGenerateBudget}
          />
        )}

        {activeTab === "Hotel Suggestions" && (
          <HotelsSection
            trip={trip}
            hotelLoading={hotelLoading}
            onGenerateHotels={handleGenerateHotels}
          />
        )}

        {activeTab === "Travel Guide & Essentials" && (
          <CompanionSection
            trip={trip}
            companionLoading={companionLoading}
            onGenerateCompanion={handleGenerateCompanion}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TripDetails;
