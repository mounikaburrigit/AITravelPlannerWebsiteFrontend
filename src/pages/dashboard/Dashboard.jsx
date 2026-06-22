import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboardService";
import TripStatusChart from "../../components/dashboard/TripStatusChart";
import TravelStatsChart from "../../components/dashboard/TravelStatsChart";
import DashboardSkeleton from "../../pages/skeletons/DashboardSkeleton";
import { motion } from "framer-motion";

import {
  FaPlane,
  FaHeart,
  FaRobot,
  FaHotel,
  FaGlobeAsia,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaPlus,
  FaFilePdf,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTrips: 0,
    itineraryCount: 0,
    budgetCount: 0,
    hotelCount: 0,

    favoriteTrips: 0,
    totalDays: 0,
    countriesPlanned: 0,

    planningTrips: 0,
    bookedTrips: 0,
    completedTrips: 0,

    latestTrip: null,
  });

  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        const response = await getDashboardStats();

        if (mounted) {
          setStats(response.stats);
          setRecentTrips(response.recentTrips || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
  relative
  overflow-hidden
  rounded-4xl
  p-8
  md:p-10
  bg-white
  dark:bg-slate-800
  border
  border-slate-200
  dark:border-slate-700
  shadow-sm
  "
      >
        {/* Background Decorations */}

        <div
          className="
    absolute
    -top-20
    -right-20
    w-72
    h-72
    rounded-full
    bg-cyan-500/10
    blur-3xl
    "
        />

        <div
          className="
    absolute
    -bottom-20
    -left-20
    w-72
    h-72
    rounded-full
    bg-blue-500/10
    blur-3xl
    "
        />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side */}

            <div>
              <h1
                className="
          text-4xl
          md:text-5xl
          font-black
          leading-tight
          "
              >
                Welcome Back,
                <br />
                <span
                  className="
            bg-linear-to-r
            from-cyan-500
            to-blue-600
            bg-clip-text
            text-transparent
            "
                >
                  Explore The World
                </span>
              </h1>

              <p
                className="
          mt-4
          max-w-2xl
          text-slate-500
          dark:text-slate-400
          text-lg
          "
              >
                Create AI-powered itineraries, manage your travel plans,
                discover destinations, and organize every trip in one place.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <Card title="Total Trips" value={stats.totalTrips} icon={<FaPlane />} />

        <Card
          title="AI Itineraries"
          value={stats.itineraryCount}
          icon={<FaRobot />}
        />

        <Card
          title="Budget Plans"
          value={stats.budgetCount}
          icon={<FaMapMarkedAlt />}
        />

        <Card
          title="Hotel Suggestions"
          value={stats.hotelCount}
          icon={<FaHotel />}
        />

        <Card
          title="Favorites"
          value={stats.favoriteTrips}
          icon={<FaHeart />}
        />

        <Card
          title="Travel Days"
          value={stats.totalDays}
          icon={<FaCalendarAlt />}
        />

        <Card
          title="Destinations"
          value={stats.countriesPlanned}
          icon={<FaGlobeAsia />}
        />
      </div>

      {/* Trip Status */}

      <div className="grid lg:grid-cols-2 gap-5">
        <TripStatusChart
          planning={stats.planningTrips}
          booked={stats.bookedTrips}
          completed={stats.completedTrips}
        />

        <TravelStatsChart
          totalTrips={stats.totalTrips}
          favoriteTrips={stats.favoriteTrips}
          itineraryCount={stats.itineraryCount}
          hotelCount={stats.hotelCount}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <StatusCard
          title="Planning Trips"
          count={stats.planningTrips}
          color="bg-blue-500"
        />

        <StatusCard
          title="Booked Trips"
          count={stats.bookedTrips}
          color="bg-amber-500"
        />

        <StatusCard
          title="Completed Trips"
          count={stats.completedTrips}
          color="bg-green-500"
        />
      </div>

      <div
        className="bg-white
dark:bg-slate-800
rounded-3xl
shadow-sm
p-6"
      >
        <div className="flex justify-between mb-3">
          <h2 className="font-bold text-xl">Trip Completion Progress</h2>

          <span className="font-semibold">
            {stats.totalTrips > 0
              ? Math.round((stats.completedTrips / stats.totalTrips) * 100)
              : 0}
            %
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-linear-to-r
from-green-500
to-emerald-400
h-4
rounded-full"
            style={{
              width: `${
                stats.totalTrips > 0
                  ? Math.round((stats.completedTrips / stats.totalTrips) * 100)
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      <div
        className="bg-white
dark:bg-slate-800
rounded-3xl
shadow-sm
p-6"
      >
        <h2 className="text-xl font-bold mb-5">Quick Actions</h2>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <QuickActionCard
            icon={<FaPlus />}
            title="Create Trip"
            description="Plan your next journey"
          />

          <QuickActionCard
            icon={<FaRobot />}
            title="AI Itinerary"
            description="Generate travel plans"
          />

          <QuickActionCard
            icon={<FaHeart />}
            title="Favorites"
            description="View saved trips"
          />

          <QuickActionCard
            icon={<FaFilePdf />}
            title="Export PDF"
            description="Download trip reports"
          />
        </div>
      </div>

      {/* Latest Trip */}

      {stats.latestTrip && (
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="
  bg-linear-to-r
  from-cyan-500
  via-blue-600
  to-indigo-600
  text-white
  rounded-4xl
  p-8
  "
        >
          <p className="uppercase text-sm opacity-80">Latest Trip</p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.latestTrip.destination}
          </h2>

          <p className="mt-3">
            {stats.latestTrip.days} Days • {stats.latestTrip.budgetType} Budget
          </p>
        </motion.div>
      )}

      {/* Recent Trips */}

      <div
        className="bg-white
dark:bg-slate-800
rounded-3xl
shadow-sm
p-6"
      >
        <h2 className="text-xl font-bold mb-5">Recent Trips</h2>

        {recentTrips.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 dark:text-slate-400">
              No trips found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <div
                key={trip._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{trip.destination}</h3>

                  <p className="text-sm text-gray-500">
                    {trip.days} Days • {trip.budgetType}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {trip.isFavorite && (
                    <span className="text-yellow-500 text-xl">★</span>
                  )}

                  <span
                    className="text-sm
bg-slate-100
dark:bg-slate-700
px-3
py-1
rounded-full"
                  >
                    {trip.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      dark:border-slate-700
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>

          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>

        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-cyan-100
          dark:bg-cyan-500/20
          text-cyan-600
          flex
          items-center
          justify-center
          "
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const StatusCard = ({ title, count }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      dark:border-slate-700
      "
    >
      <h3 className="text-slate-500 dark:text-slate-400">{title}</h3>

      <p className="text-4xl font-bold mt-2">{count}</p>
    </motion.div>
  );
};

const QuickActionCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      dark:border-slate-700
      cursor-pointer
      "
    >
      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-cyan-100
        dark:bg-cyan-500/20
        text-cyan-600
        flex
        items-center
        justify-center
        text-xl
        mb-4
        "
      >
        {icon}
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </motion.div>
  );
};

export default Dashboard;
