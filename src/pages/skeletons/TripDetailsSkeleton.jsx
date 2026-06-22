import { motion } from "framer-motion";

const TripDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/40 dark:border-slate-700/40 space-y-8 animate-pulse">

        {/* HERO SKELETON */}
        <div className="relative overflow-hidden rounded-3xl p-8 bg-slate-200 dark:bg-slate-700">
          <div className="space-y-4">
            <div className="h-4 w-40 bg-slate-300 dark:bg-slate-600 rounded-full" />
            <div className="h-10 w-2/3 bg-slate-300 dark:bg-slate-600 rounded-xl" />
            <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded-full" />
            <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-600 rounded-full" />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3">
          <div className="h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-12 w-40 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-40 bg-slate-200 dark:bg-slate-700 rounded-2xl"
            />
          ))}
        </div>

        {/* SECTION CONTENT SKELETON */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-slate-200 dark:bg-slate-700 space-y-3"
            >
              <div className="h-5 w-1/3 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-600 rounded" />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TripDetailsSkeleton;