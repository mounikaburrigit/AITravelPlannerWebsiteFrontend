import { motion } from "framer-motion";

const TripCardSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg"
        >
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-2" />

          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-6" />

          <div className="flex gap-2 mb-6">
            <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>

          <div className="flex gap-2">
            <div className="w-20 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="w-20 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TripCardSkeleton;