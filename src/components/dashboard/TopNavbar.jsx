import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className="
      h-20
      sticky
      top-0
      z-40
      px-4
      md:px-6
      bg-white/80
      dark:bg-slate-900/80
      backdrop-blur-xl
      border-b
      border-slate-200
      dark:border-slate-800
      flex
      items-center
      justify-between
      "
    >
      {/* Left */}

      <div>
        <h1 className="text-xl md:text-2xl font-bold dark:text-white">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your AI travel plans
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {/* Theme */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="
          w-11
          h-11
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-700
          hover:bg-slate-100
          dark:hover:bg-slate-800
          flex
          items-center
          justify-center
          transition
          "
        >
          {darkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon />
          )}
        </motion.button>

        {/* Logout */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={logout}
          className="
          w-11
          h-11
          rounded-2xl
          border
          border-red-200
          text-red-500
          hover:bg-red-50
          flex
          items-center
          justify-center
          transition
          "
        >
          <FaSignOutAlt />
        </motion.button>

        {/* User */}

        <div
          className="
          w-11
          h-11
          rounded-2xl
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          text-white
          flex
          items-center
          justify-center
          font-bold
          "
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Hide on Mobile */}

        <div className="hidden md:block">
          <p className="font-semibold dark:text-white">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {user?.email}
          </p>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;