import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaWallet,
  FaHotel,
  FaPassport,
} from "react-icons/fa";

const tabs = [
  {
    label: "Daily Travel Plan",
    icon: <FaMapMarkedAlt />,
  },
  {
    label: "Budget Planner",
    icon: <FaWallet />,
  },
  {
    label: "Hotel Suggestions",
    icon: <FaHotel />,
  },
  {
    label: "Travel Guide & Essentials",
    icon: <FaPassport />,
  },
];

const TripTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-2 rounded-2xl border border-slate-200/40 dark:border-slate-700/40 shadow-lg">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.label;

        return (
          <motion.button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl font-semibold
              transition-all duration-300 relative overflow-hidden
              ${
                isActive
                  ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60"
              }
            `}
          >
            {/* Icon */}
            <span className="text-lg">{tab.icon}</span>

            {/* Label */}
            <span className="whitespace-nowrap">{tab.label}</span>

            {/* Active glow */}
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl bg-white/10"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default TripTabs;