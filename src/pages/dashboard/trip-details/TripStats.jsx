import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

const TripStats = ({ trip }) => {
  const stats = [
    {
      label: "Days",
      value: trip?.days || 0,
      icon: <FaCalendarAlt />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Budget",
      value: trip?.budgetType || "N/A",
      icon: <FaWallet />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Travelers",
      value: trip?.travelers || 1,
      icon: <FaUsers />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Status",
      value: trip?.status || "Planning",
      icon: <FaRocket />,
      color: "from-orange-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            p-5
            bg-white/70
            dark:bg-slate-800/70
            backdrop-blur-xl
            border
            border-slate-200/40
            dark:border-slate-700/40
            shadow-lg
            transition-all
          "
        >
          {/* Glow background */}
          <div
            className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30 bg-linear-to-r ${item.color}`}
          />

          {/* Icon */}
          <div
            className={`w-12 h-12 mb-4 rounded-2xl flex items-center justify-center text-white bg-linear-to-r ${item.color} shadow-md`}
          >
            <span className="text-xl">{item.icon}</span>
          </div>

          {/* Label */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.label}
          </p>

          {/* Value */}
          <h3 className="text-xl font-black text-slate-800 dark:text-white mt-1 capitalize">
            {item.value}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default TripStats;