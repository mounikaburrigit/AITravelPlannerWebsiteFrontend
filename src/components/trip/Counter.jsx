import { motion } from "framer-motion";

const Counter = ({ title, value, onIncrease, onDecrease, min = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Title */}
      <h4 className="text-sm font-semibold mb-3 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {title}
      </h4>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        
        {/* Decrease */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onDecrease}
          disabled={value <= min}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all
            ${
              value <= min
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
        >
          −
        </motion.button>

        {/* Value */}
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold w-12 text-center text-slate-800 dark:text-slate-100"
        >
          {value}
        </motion.span>

        {/* Increase */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onIncrease}
          className="w-10 h-10 rounded-full bg-slate-600 dark:bg-slate-500 text-white flex items-center justify-center text-xl font-bold hover:bg-slate-700 dark:hover:bg-slate-400 transition"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Counter;