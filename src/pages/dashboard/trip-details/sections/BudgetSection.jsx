import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaBus,
  FaMapMarkedAlt,
  FaSyncAlt,
} from "react-icons/fa";

const BudgetSection = ({
  trip,
  budgetLoading,
  onGenerateBudget,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-10"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-600 dark:bg-slate-500 flex items-center justify-center text-white shadow-lg">
            <FaMoneyBillWave size={18} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Travel Budget Planner
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Get an AI-generated estimate of your travel expenses based on your
          destination, trip duration, and travel preferences. This budget
          includes accommodation, transportation, meals, activities, and
          overall estimated trip costs.
        </p>
      </div>

      {/* Generate Button */}
      {!trip?.budgetEstimate?.total && (
        <motion.button
          whileHover={{ scale: budgetLoading ? 1 : 1.02 }}
          whileTap={{ scale: budgetLoading ? 1 : 0.98 }}
          onClick={onGenerateBudget}
          disabled={budgetLoading}
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50 mb-6"
        >
          {budgetLoading
            ? "⏳ Generating Budget..."
            : "💰 Generate Travel Budget"}
        </motion.button>
      )}

      {/* Budget Result */}
      {trip?.budgetEstimate?.total && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <FaPlane />
                <span>Flight</span>
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                {trip.budgetEstimate.flight}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <FaHotel />
                <span>Hotel</span>
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                {trip.budgetEstimate.hotel}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <FaUtensils />
                <span>Food</span>
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                {trip.budgetEstimate.food}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <FaBus />
                <span>Transportation</span>
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                {trip.budgetEstimate.transportation}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <FaMapMarkedAlt />
                <span>Activities</span>
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">
                {trip.budgetEstimate.activities}
              </p>
            </div>

            <div className="bg-linear-to-r from-slate-700 to-slate-900 rounded-2xl p-5 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <FaMoneyBillWave />
                <span>Total Budget</span>
              </div>

              <p className="text-2xl font-bold">
                {trip.budgetEstimate.total}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: budgetLoading ? 1 : 1.02 }}
            whileTap={{ scale: budgetLoading ? 1 : 0.98 }}
            onClick={onGenerateBudget}
            disabled={budgetLoading}
            className="mt-6 flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            <FaSyncAlt />
            {budgetLoading
              ? "Regenerating..."
              : "Regenerate Budget"}
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default BudgetSection;