import { motion } from "framer-motion";
import { FaPlaneDeparture } from "react-icons/fa";

const TripHero = ({ trip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative overflow-hidden rounded-4xl
        p-8 md:p-10 mb-8
        bg-linear-to-r from-slate-800 via-slate-700 to-slate-800
        text-white shadow-xl
      "
    >
      {/* subtle background glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-500/10 rounded-full blur-3xl" />

      {/* floating icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="
          absolute top-6 right-6 hidden md:flex
          items-center justify-center
          w-16 h-16 rounded-2xl
          bg-white/10 backdrop-blur-md
          border border-white/10
        "
      >
        <FaPlaneDeparture className="text-2xl text-slate-200" />
      </motion.div>

      <div className="relative z-10">
        {/* badge */}
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-slate-200 tracking-wide">
            AI Travel Planner
          </span>
        </div>

        {/* title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
          {trip?.destination || "Your Trip"}
        </h1>

        {/* subtitle */}
        <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
          Your AI-generated travel plan with smart itinerary, hotel suggestions,
          budget breakdown, and travel guidance — all in one place.
        </p>
      </div>
    </motion.div>
  );
};

export default TripHero;