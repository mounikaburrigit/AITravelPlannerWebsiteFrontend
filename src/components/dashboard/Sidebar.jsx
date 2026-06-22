import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSuitcase,
  FaPlusCircle,
  FaUser,
  FaStar,
  FaPlaneDeparture,
} from "react-icons/fa";
import { motion } from "framer-motion";

const navItems = [
  {
    path: "/dashboard",
    icon: FaHome,
    label: "Dashboard",
  },
  {
    path: "/dashboard/create-trip",
    icon: FaPlusCircle,
    label: "Create Trip",
  },
  {
    path: "/dashboard/my-trips",
    icon: FaSuitcase,
    label: "My Trips",
  },
  {
    path: "/dashboard/favorites",
    icon: FaStar,
    label: "Favorites",
  },
  {
    path: "/dashboard/profile",
    icon: FaUser,
    label: "Profile",
  },
];

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className="
        hidden
        md:flex
        flex-col
        w-72
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-200
        dark:border-slate-800
        min-h-screen
        p-6
        "
      >
        <div className="flex items-center gap-3 mb-12">
          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-linear-to-r
            from-cyan-500
            to-blue-600
            text-white
            flex
            items-center
            justify-center
            "
          >
            <FaPlaneDeparture />
          </div>

          <div>
            <h2 className="font-bold text-lg dark:text-white">
              AI Travel
            </h2>

            <p className="text-xs text-slate-500">
              Planner Basic
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-2xl
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}

      <div
        className="
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-white
        dark:bg-slate-900
        border-t
        border-slate-200
        dark:border-slate-800
        backdrop-blur-xl
        "
      >
        <div className="flex justify-around items-center h-18">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
              >
                {({ isActive }) => (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`
                      flex
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-cyan-500 text-white w-12 h-12 -translate-y-2"
                          : "text-slate-500 dark:text-slate-400 w-10 h-10"
                      }
                    `}
                  >
                    <Icon size={20} />
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;