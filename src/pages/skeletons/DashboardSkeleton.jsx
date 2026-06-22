const SkeletonBox = ({ className }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-2xl ${className}`}
  />
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-4xl p-8 bg-slate-200 dark:bg-slate-800 animate-pulse">
        <SkeletonBox className="h-4 w-32 mb-4" />
        <SkeletonBox className="h-12 w-96 mb-4" />
        <SkeletonBox className="h-4 w-full max-w-2xl mb-2" />
        <SkeletonBox className="h-4 w-2/3 mb-6" />

        <div className="flex gap-3">
          <SkeletonBox className="h-10 w-28 rounded-full" />
          <SkeletonBox className="h-10 w-32 rounded-full" />
          <SkeletonBox className="h-10 w-36 rounded-full" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <SkeletonBox className="h-4 w-20 mb-4" />
                <SkeletonBox className="h-8 w-16" />
              </div>

              <SkeletonBox className="h-12 w-12 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
          <SkeletonBox className="h-6 w-52 mb-6" />
          <SkeletonBox className="h-75 w-full" />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
          <SkeletonBox className="h-6 w-52 mb-6" />
          <SkeletonBox className="h-75 w-full" />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6"
          >
            <SkeletonBox className="h-4 w-24 mb-4" />
            <SkeletonBox className="h-10 w-20" />
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
        <SkeletonBox className="h-6 w-60 mb-6" />
        <SkeletonBox className="h-4 w-full rounded-full" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
        <SkeletonBox className="h-6 w-40 mb-6" />

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border dark:border-slate-700 rounded-3xl p-6"
            >
              <SkeletonBox className="h-12 w-12 rounded-2xl mb-4" />
              <SkeletonBox className="h-5 w-28 mb-2" />
              <SkeletonBox className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Latest Trip */}
      <div className="rounded-4xl p-8 bg-slate-200 dark:bg-slate-800">
        <SkeletonBox className="h-4 w-24 mb-4" />
        <SkeletonBox className="h-10 w-72 mb-4" />
        <SkeletonBox className="h-4 w-52" />
      </div>

      {/* Recent Trips */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
        <SkeletonBox className="h-6 w-40 mb-6" />

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 border-b dark:border-slate-700"
          >
            <div>
              <SkeletonBox className="h-5 w-40 mb-2" />
              <SkeletonBox className="h-4 w-24" />
            </div>

            <SkeletonBox className="h-8 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;