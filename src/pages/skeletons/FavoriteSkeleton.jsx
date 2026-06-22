import { motion } from "framer-motion";

const FavoriteSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-center mb-5">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>

          <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3" />

          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-6" />

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-700 rounded-xl p-3"
              >
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-600 rounded mb-2" />
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-600 rounded" />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"
              />
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FavoriteSkeleton;