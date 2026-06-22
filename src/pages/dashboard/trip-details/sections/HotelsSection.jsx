import { motion } from "framer-motion";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaMagic,
} from "react-icons/fa";

const HotelsSection = ({ trip, hotelLoading, onGenerateHotels }) => {
  const hasHotels = trip?.hotels?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className="mt-6"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-700 dark:bg-slate-600 flex items-center justify-center text-white shadow-lg">
            <FaHotel size={18} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Hotel Recommendations
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 max-w-3xl">
          Discover AI-selected hotel recommendations based on your destination,
          budget, travel style, and trip preferences. Each suggestion includes
          accommodation type, location details, pricing information, and a
          short overview to help you choose the right stay.
        </p>

        {!hasHotels && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: hotelLoading ? 1 : 1.02 }}
            whileTap={{ scale: hotelLoading ? 1 : 0.98 }}
            onClick={onGenerateHotels}
            disabled={hotelLoading}
            className="bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            {hotelLoading
              ? "Generating Hotel Suggestions..."
              : "Generate Hotel Suggestions"}
          </motion.button>
        )}
      </div>

      {/* Hotels Grid */}
      {hasHotels && (
        <div className="grid md:grid-cols-2 gap-5">
          {trip.hotels.map((hotel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Hotel Name */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <FaHotel className="text-slate-700 dark:text-slate-300" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                    {hotel.name}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Recommended accommodation
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaBuilding className="text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Type:</strong> {hotel.type}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Area:</strong> {hotel.area}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Price Range:</strong> {hotel.priceRange}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <FaMagic className="text-slate-500" />
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Why This Hotel?
                  </h4>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {hotel.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HotelsSection;