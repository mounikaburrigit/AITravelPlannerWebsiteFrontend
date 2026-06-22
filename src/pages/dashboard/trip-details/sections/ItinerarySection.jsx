import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMagic,
  FaSyncAlt,
} from "react-icons/fa";

const ItinerarySection = ({
  trip,
  onRegenerateDay,
  onGenerateItinerary,
  aiLoading,
}) => {
  const hasItinerary = trip?.itinerary?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="mt-10"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-600 dark:bg-slate-500 flex items-center justify-center text-white shadow-lg">
            <FaCalendarAlt size={18} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Daily Travel Plan
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Create a personalized day-by-day travel plan powered by AI. Each day
          includes recommended attractions, activities, sightseeing locations,
          and experiences tailored to your destination, trip duration, and
          travel style.
        </p>
      </div>

      {/* Generate Button */}
      {!hasItinerary && (
        <motion.button
          whileHover={{ scale: aiLoading ? 1 : 1.02 }}
          whileTap={{ scale: aiLoading ? 1 : 0.98 }}
          onClick={onGenerateItinerary}
          disabled={aiLoading}
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50"
        >
          {aiLoading
            ? "⏳ Generating Travel Plan..."
            : "✨ Generate Travel Plan"}
        </motion.button>
      )}

      {/* Generated Plan */}
      {hasItinerary && (
        <>
          <div className="space-y-5">
            {trip.itinerary.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white">
                      Day {day.day}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Recommended places and activities for this day.
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-slate-600 dark:text-slate-300" />
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {day.activities?.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                    >
                      <FaMagic className="text-slate-500 mt-1 shrink-0" />

                      <p className="text-slate-700 dark:text-slate-300">
                        {activity}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRegenerateDay(day.day)}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all"
                >
                  <FaSyncAlt />
                  Regenerate Day
                </motion.button>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ItinerarySection;